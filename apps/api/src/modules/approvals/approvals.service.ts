import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Approval } from './entities/approval.entity';
import { CreateApprovalDto } from './dto/create-approval.dto';
import { ApproveDto } from './dto/approve.dto';

@Injectable()
export class ApprovalsService {
  constructor(@InjectRepository(Approval) private readonly repo: Repository<Approval>) {}

  create(dto: CreateApprovalDto) {
    return this.repo.save(this.repo.create(dto));
  }

  findAll(filters: { status?: string; approverId?: string }) {
    return this.repo.find({
      where: {
        ...(filters.status ? { status: filters.status as any } : {}),
        ...(filters.approverId ? { approverId: filters.approverId } : {}),
      },
      order: { createdAt: 'DESC' },
    });
  }

  async decide(id: string, actorId: string, dto: ApproveDto) {
    const approval = await this.repo.findOne({ where: { id } });
    if (!approval) throw new NotFoundException(`Approval ${id} not found`);
    if (approval.approverId !== actorId) throw new ForbiddenException('Not your approval to decide');
    if (approval.status !== 'pending') throw new ForbiddenException('Already decided');

    approval.status = dto.decision;
    approval.comments = dto.comments ?? approval.comments;
    return this.repo.save(approval);
  }
}
