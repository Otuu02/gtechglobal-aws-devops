import { Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';

@ApiTags('notifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly svc: NotificationsService) {}

  @Get() list(
    @CurrentUser('id') userId: string,
    @Query('unread') unread?: string,
  ) { return this.svc.listForUser(userId, unread === 'true'); }

  @Patch(':id/read')
  markRead(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.svc.markRead(id, userId);
  }

  @Patch('read-all')
  markAll(@CurrentUser('id') userId: string) { return this.svc.markAllRead(userId); }
}
