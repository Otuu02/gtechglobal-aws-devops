import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { CreateTeamDto } from './dto/create-team.dto';

@Injectable()
export class TeamsService {
  constructor(@InjectRepository(Team) private readonly repo: Repository<Team>) {}
  create(dto: CreateTeamDto) { return this.repo.save(this.repo.create(dto)); }
  findAll(departmentId?: string) {
    return this.repo.find({ where: departmentId ? { departmentId } : {} });
  }
}
