import {
  Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';

@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly svc: TasksService) {}

  @Post() create(@Body() dto: CreateTaskDto) { return this.svc.create(dto); }
  @Get() findAll(
    @Query('status') status?: string,
    @Query('assigneeId') assigneeId?: string,
    @Query('projectId') projectId?: string,
  ) { return this.svc.findAll({ status, assigneeId, projectId }); }
  @Get(':id') findOne(@Param('id') id: string) { return this.svc.findOne(id); }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.svc.update(id, dto);
  }
  @Delete(':id') remove(@Param('id') id: string) { return this.svc.remove(id); }
}
