import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';

@ApiTags('comments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly svc: CommentsService) {}
  @Post() create(@Body() dto: CreateCommentDto) { return this.svc.create(dto); }
  @Get() findAll(@Query('entityType') t: string, @Query('entityId') id: string) {
    return this.svc.findAll(t, id);
  }
}
