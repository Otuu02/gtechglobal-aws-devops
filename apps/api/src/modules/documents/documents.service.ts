import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';

@Injectable()
export class DocumentsService {
  constructor(@InjectRepository(Document) private readonly repo: Repository<Document>) {}

  create(dto: CreateDocumentDto) { return this.repo.save(this.repo.create(dto)); }

  async search(q: string, type?: string) {
    const where: any = {};
    if (type) where.type = type;
    if (q) where.title = ILike(`%${q}%`);
    return this.repo.find({ where, order: { updatedAt: 'DESC' }, take: 100 });
  }

  async findOne(id: string) {
    const doc = await this.repo.findOne({ where: { id } });
    if (!doc) throw new NotFoundException(`Document ${id} not found`);
    return doc;
  }

  async publish(id: string) {
    const doc = await this.findOne(id);
    doc.status = 'published';
    doc.version += 1;
    return this.repo.save(doc);
  }
}
