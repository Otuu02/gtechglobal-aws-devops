import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

  async create(dto: CreateUserDto): Promise<User> {
    const exists = await this.repo.findOne({ where: { email: dto.email.toLowerCase() } });
    if (exists) throw new ConflictException('Email already in use');

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = this.repo.create({
      ...dto,
      email: dto.email.toLowerCase().trim(),
      passwordHash,
    });
    return this.repo.save(user);
  }

  findAll(search?: string) {
    return this.repo.find({
      where: search
        ? [
            { firstName: ILike(`%${search}%`) },
            { lastName: ILike(`%${search}%`) },
            { email: ILike(`%${search}%`) },
          ]
        : {},
      order: { createdAt: 'DESC' },
      relations: ['organization', 'department'],
    });
  }

  async findOne(id: string) {
    const user = await this.repo.findOne({
      where: { id },
      relations: ['organization', 'department'],
    });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.findOne(id);
    Object.assign(user, dto);
    return this.repo.save(user);
  }

  async deactivate(id: string) {
    const user = await this.findOne(id);
    user.status = 'inactive';
    return this.repo.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    await this.repo.remove(user);
    return { id, deleted: true };
  }
}
