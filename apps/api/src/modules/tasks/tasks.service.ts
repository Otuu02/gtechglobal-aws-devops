import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private readonly repo: Repository<Task>) {}

  create(dto: CreateTaskDto) { return this.repo.save(this.repo.create(dto)); }

  findAll(filters: { status?: string; assigneeId?: string; projectId?: string }) {
    return this.repo.find({
      where: {
        ...(filters.status ? { status: filters.status as any } : {}),
        ...(filters.assigneeId ? { assigneeId: filters.assigneeId } : {}),
        ...(filters.projectId ? { projectId: filters.projectId } : {}),
      },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const t = await this.repo.findOne({ where: { id } });
    if (!t) throw new NotFoundException(`Task ${id} not found`);
    return t;
  }

  async update(id: string, dto: UpdateTaskDto) {
    const t = await this.findOne(id);
    Object.assign(t, dto);
    return this.repo.save(t);
  }

  async remove(id: string) {
    await this.repo.delete(id);
    return { id, deleted: true };
  }
}
