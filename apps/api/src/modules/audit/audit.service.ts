import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditEvent } from './entities/audit-event.entity';

@Injectable()
export class AuditService {
  constructor(@InjectRepository(AuditEvent) private readonly repo: Repository<AuditEvent>) {}

  record(event: Partial<AuditEvent>) {
    return this.repo.save(this.repo.create(event));
  }

  list(filters: { actorId?: string; entityType?: string } = {}) {
    return this.repo.find({
      where: { ...filters },
      order: { createdAt: 'DESC' },
      take: 500,
    });
  }
}
