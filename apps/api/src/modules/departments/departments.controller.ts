import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';

@ApiTags('departments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly svc: DepartmentsService) {}
  @Post() create(@Body() dto: CreateDepartmentDto) { return this.svc.create(dto); }
  @Get()  findAll(@Query('organizationId') orgId?: string) { return this.svc.findAll(orgId); }
}
