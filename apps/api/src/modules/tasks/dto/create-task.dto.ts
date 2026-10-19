import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsIn,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { TaskPriority, TaskStatus } from '../entities/task.entity';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @Length(2, 200)
  title!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false, enum: ['low', 'medium', 'high', 'critical'] })
  @IsOptional()
  @IsIn(['low', 'medium', 'high', 'critical'])
  priority?: TaskPriority;

  @ApiProperty({
    required: false,
    enum: ['todo', 'in_progress', 'review', 'done', 'cancelled'],
  })
  @IsOptional()
  @IsIn(['todo', 'in_progress', 'review', 'done', 'cancelled'])
  status?: TaskStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  assigneeId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  projectId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  parentTaskId?: string;

  @ApiProperty()
  @IsUUID()
  createdBy!: string;
}
