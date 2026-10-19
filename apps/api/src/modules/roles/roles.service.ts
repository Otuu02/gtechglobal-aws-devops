import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { Permission } from '@modules/permissions/entities/permission.entity';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly roles: Repository<Role>,
    @InjectRepository(Permission) private readonly perms: Repository<Permission>,
  ) {}

  async create(dto: CreateRoleDto) {
    const permissions = dto.permissionIds?.length
      ? await this.perms.find({ where: { id: In(dto.permissionIds) } })
      : [];
    return this.roles.save(this.roles.create({ ...dto, permissions }));
  }

  findAll() {
    return this.roles.find({ order: { name: 'ASC' } });
  }

  async findOne(id: string) {
    const role = await this.roles.findOne({ where: { id } });
    if (!role) throw new NotFoundException(`Role ${id} not found`);
    return role;
  }
}
