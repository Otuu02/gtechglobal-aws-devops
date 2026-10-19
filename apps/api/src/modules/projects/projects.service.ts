import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(Project) private readonly repo: Repository<Project>) {}

  create(dto: CreateProjectDto) { return this.repo.save(this.repo.create(dto)); }

  findAll(filters: { status?: string; ownerId?: string } = {}) {
    return this.repo.find({
      where: {
        ...(filters.status ? { status: filters.status as any } : {}),
        ...(filters.ownerId ? { ownerId: filters.ownerId } : {}),
      },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const p = await this.repo.findOne({ where: { id } });
    if (!p) throw new NotFoundException(`Project ${id} not found`);
    return p;
  }

  async update(id: string, dto: UpdateProjectDto) {
    const p = await this.findOne(id);
    Object.assign(p, dto);
    return this.repo.save(p);
  }

  async remove(id: string) {
    await this.repo.delete(id);
    return { id, deleted: true };
  }
}
