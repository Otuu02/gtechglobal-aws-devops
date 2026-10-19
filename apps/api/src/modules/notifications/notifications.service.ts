import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(@InjectRepository(Notification) private readonly repo: Repository<Notification>) {}

  create(data: Partial<Notification>) {
    return this.repo.save(this.repo.create(data));
  }

  listForUser(userId: string, unreadOnly = false) {
    return this.repo.find({
      where: unreadOnly ? { userId, read: false } : { userId },
      order: { createdAt: 'DESC' },
      take: 100,
    });
  }

  async markRead(id: string, userId: string) {
    await this.repo.update({ id, userId }, { read: true });
    return { id, read: true };
  }

  async markAllRead(userId: string) {
    await this.repo.update({ userId, read: false }, { read: true });
    return { success: true };
  }
}
