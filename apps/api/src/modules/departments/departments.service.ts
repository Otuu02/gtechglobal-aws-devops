import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(@InjectRepository(Department) private readonly repo: Repository<Department>) {}

  create(dto: CreateDepartmentDto) {
    return this.repo.save(this.repo.create(dto));
  }
  findAll(organizationId?: string) {
    return this.repo.find({
      where: organizationId ? { organizationId } : {},
      order: { name: 'ASC' },
    });
  }
}
