import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';

@ApiTags('teams')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('teams')
export class TeamsController {
  constructor(private readonly svc: TeamsService) {}
  @Post() create(@Body() dto: CreateTeamDto) { return this.svc.create(dto); }
  @Get()  findAll(@Query('departmentId') deptId?: string) { return this.svc.findAll(deptId); }
}
