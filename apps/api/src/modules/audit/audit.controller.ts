import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuditService } from './audit.service';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';

@ApiTags('audit')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('audit')
export class AuditController {
  constructor(private readonly svc: AuditService) {}
  @Get() list(
    @Query('actorId') actorId?: string,
    @Query('entityType') entityType?: string,
  ) { return this.svc.list({ actorId, entityType }); }
}
