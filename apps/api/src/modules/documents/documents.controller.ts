import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';

@ApiTags('documents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('documents')
export class DocumentsController {
  constructor(private readonly svc: DocumentsService) {}

  @Post() create(@Body() dto: CreateDocumentDto) { return this.svc.create(dto); }

  @Get() search(@Query('q') q = '', @Query('type') type?: string) {
    return this.svc.search(q, type);
  }

  @Get(':id') findOne(@Param('id') id: string) { return this.svc.findOne(id); }
  @Patch(':id/publish') publish(@Param('id') id: string) { return this.svc.publish(id); }
}
