import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApprovalsService } from './approvals.service';
import { CreateApprovalDto } from './dto/create-approval.dto';
import { ApproveDto } from './dto/approve.dto';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';

@ApiTags('approvals')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('approvals')
export class ApprovalsController {
  constructor(private readonly svc: ApprovalsService) {}

  @Post() create(@Body() dto: CreateApprovalDto) { return this.svc.create(dto); }

  @Get() findAll(@Query('status') status?: string, @Query('approverId') approverId?: string) {
    return this.svc.findAll({ status, approverId });
  }

  @Post(':id/decide')
  decide(@Param('id') id: string, @CurrentUser('id') userId: string, @Body() dto: ApproveDto) {
    return this.svc.decide(id, userId, dto);
  }
}
