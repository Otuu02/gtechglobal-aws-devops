import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';

import { User } from '@modules/users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

const BCRYPT_ROUNDS = 12;

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.users.findOne({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email already registered');

    const passwordHash = await bcrypt.hash(dto.password, BCRYPT_ROUNDS);
    const user = this.users.create({
      email: dto.email.toLowerCase().trim(),
      firstName: dto.firstName.trim(),
      lastName: dto.lastName.trim(),
      passwordHash,
      status: 'active',
    });
    await this.users.save(user);
    this.logger.log(`New account created: ${user.email}`);

    return this.issueTokens(user);
  }

  async login(dto: LoginDto, ip?: string) {
    const user = await this.users
      .createQueryBuilder('u')
      .addSelect('u.passwordHash')
      .where('u.email = :email', { email: dto.email.toLowerCase().trim() })
      .getOne();

    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      this.logger.warn(`Failed login attempt for ${dto.email} from ${ip ?? 'unknown'}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.status !== 'active') {
      throw new UnauthorizedException('Account is not active');
    }

    if (user.mfaEnabled) {
      if (!dto.mfaCode) {
        return { mfaRequired: true as const };
      }
      const secret = (user as any).mfaSecret as string;
      const ok = speakeasy.totp.verify({
        secret,
        encoding: 'base32',
        token: dto.mfaCode,
        window: 1,
      });
      if (!ok) throw new UnauthorizedException('Invalid MFA code');
    }

    user.lastLoginAt = new Date();
    await this.users.save(user);
    this.logger.log(`User signed in: ${user.email}`);

    return this.issueTokens(user);
  }

  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwt.verifyAsync<{ sub: string; type: string }>(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      if (payload.type !== 'refresh') throw new Error('wrong token type');

      const user = await this.users.findOne({ where: { id: payload.sub } });
      if (!user || user.status !== 'active') throw new Error('invalid user');

      return this.issueTokens(user);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async startMfaSetup(userId: string) {
    const user = await this.users.findOneOrFail({ where: { id: userId } });
    const secret = speakeasy.generateSecret({
      name: `GTECHGLOBAL OS (${user.email})`,
      issuer: 'GTECHGLOBAL',
      length: 20,
    });

    const qrDataUrl = await QRCode.toDataURL(secret.otpauth_url!);
    return {
      secret: secret.base32,
      qrDataUrl,
      manualEntry: secret.base32,
    };
  }

  async enableMfa(userId: string, code: string) {
    const user = await this.users
      .createQueryBuilder('u')
      .addSelect('u.mfaSecret')
      .where('u.id = :id', { id: userId })
      .getOneOrFail();

    const secret = (user as any).mfaSecret as string | null;
    if (!secret) throw new UnauthorizedException('MFA setup not started');

    const ok = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token: code,
      window: 1,
    });
    if (!ok) throw new UnauthorizedException('Invalid code');

    user.mfaEnabled = true;
    await this.users.save(user);
    return { enabled: true };
  }

  // ─── Helpers ───
  private async issueTokens(user: User) {
    const payload = { sub: user.id, email: user.email, status: user.status };
    const accessToken = await this.jwt.signAsync(payload);
    const refreshToken = await this.jwt.signAsync(
      { sub: user.id, type: 'refresh' },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '7d',
      },
    );

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatarUrl: user.avatarUrl,
        organizationId: user.organizationId,
        departmentId: user.departmentId,
        mfaEnabled: user.mfaEnabled,
      },
    };
  }
}
