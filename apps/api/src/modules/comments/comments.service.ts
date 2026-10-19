import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comment) private readonly repo: Repository<Comment>) {}

  create(dto: CreateCommentDto) {
    return this.repo.save(this.repo.create(dto));
  }

  findAll(entityType: string, entityId: string) {
    return this.repo.find({
      where: { entityType, entityId },
      order: { createdAt: 'ASC' },
    });
  }
}
