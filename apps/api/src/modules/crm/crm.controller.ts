import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CrmService } from './crm.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';

@ApiTags('crm')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('crm')
export class CrmController {
  constructor(private readonly svc: CrmService) {}
  @Post('leads') create(@Body() dto: CreateLeadDto) { return this.svc.createLead(dto); }
  @Get('leads') list(@Query('status') status?: string) { return this.svc.listLeads(status); }
  @Get('leads/:id') get(@Param('id') id: string) { return this.svc.getLead(id); }
  @Patch('leads/:id/status') advance(@Param('id') id: string, @Body('status') status: any) {
    return this.svc.advance(id, status);
  }
}
