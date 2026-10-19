import {
  Body,
  Controller,
  Get,
  Ip,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  @Throttle({ short: { limit: 5, ttl: 60_000 } })
  @ApiOperation({ summary: 'Create a new account' })
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  @Post('login')
  @Throttle({ short: { limit: 10, ttl: 60_000 } })
  @ApiOperation({ summary: 'Sign in with email & password' })
  login(@Body() dto: LoginDto, @Ip() ip: string) {
    return this.auth.login(dto, ip);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Exchange a refresh token for a fresh token pair' })
  refresh(@Body('refreshToken') refreshToken: string) {
    return this.auth.refresh(refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  @ApiOperation({ summary: 'Return the authenticated user' })
  me(@CurrentUser() user: any) {
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('mfa/setup')
  @ApiOperation({ summary: 'Generate TOTP secret + QR code' })
  mfaSetup(@CurrentUser('id') userId: string) {
    return this.auth.startMfaSetup(userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('mfa/enable')
  @ApiOperation({ summary: 'Confirm TOTP code and enable MFA' })
  mfaEnable(@CurrentUser('id') userId: string, @Body('code') code: string) {
    return this.auth.enableMfa(userId, code);
  }
}
