import {
  Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';

@ApiTags('projects')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly svc: ProjectsService) {}

  @Post() create(@Body() dto: CreateProjectDto) { return this.svc.create(dto); }

  @Get() findAll(@Query('status') status?: string, @Query('ownerId') ownerId?: string) {
    return this.svc.findAll({ status, ownerId });
  }

  @Get(':id') findOne(@Param('id') id: string) { return this.svc.findOne(id); }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.svc.update(id, dto);
  }
  @Delete(':id') remove(@Param('id') id: string) { return this.svc.remove(id); }
}
