import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

export type NotificationType = 'info' | 'warning' | 'error' | 'success';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid') id!: string;

  @Index()
  @Column({ name: 'user_id', type: 'uuid' }) userId!: string;

  @Column({ length: 200 }) title!: string;
  @Column({ type: 'text' }) message!: string;
  @Column({ length: 20, default: 'info' }) type!: NotificationType;
  @Column({ default: false }) read!: boolean;
  @Column({ name: 'link_url', nullable: true }) linkUrl?: string;
  @Column({ type: 'jsonb', nullable: true }) metadata?: Record<string, unknown>;

  @CreateDateColumn({ type: 'timestamptz' }) createdAt!: Date;
}
