import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GwashService } from './gwash.service';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';

@ApiTags('gwash')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('gwash')
export class GwashController {
  constructor(private readonly svc: GwashService) {}
  @Get('kpis') kpis() { return this.svc.getKpis(); }
  @Get('health') health() { return this.svc.healthCheck(); }
}
