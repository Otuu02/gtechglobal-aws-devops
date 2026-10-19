import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './entities/lead.entity';
import { CreateLeadDto } from './dto/create-lead.dto';

@Injectable()
export class CrmService {
  constructor(@InjectRepository(Lead) private readonly leads: Repository<Lead>) {}

  createLead(dto: CreateLeadDto) {
    return this.leads.save(this.leads.create(dto));
  }

  listLeads(status?: string) {
    return this.leads.find({
      where: status ? { status: status as any } : {},
      order: { createdAt: 'DESC' },
    });
  }

  async getLead(id: string) {
    const l = await this.leads.findOne({ where: { id } });
    if (!l) throw new NotFoundException(`Lead ${id} not found`);
    return l;
  }

  async advance(id: string, status: Lead['status']) {
    const lead = await this.getLead(id);
    lead.status = status;
    return this.leads.save(lead);
  }
}
