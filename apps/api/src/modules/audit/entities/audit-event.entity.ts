import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

@Entity('audit_events')
@Index(['actorId', 'createdAt'])
@Index(['entityType', 'entityId'])
export class AuditEvent {
  @PrimaryGeneratedColumn('uuid') id!: string;

  @Column({ name: 'actor_id', type: 'uuid', nullable: true }) actorId?: string;
  @Column({ length: 40 }) action!: string;
  @Column({ name: 'entity_type', length: 60 }) entityType!: string;
  @Column({ name: 'entity_id', type: 'uuid', nullable: true }) entityId?: string;

  @Column({ type: 'jsonb', nullable: true }) before?: Record<string, unknown>;
  @Column({ type: 'jsonb', nullable: true }) after?: Record<string, unknown>;

  @Column({ name: 'ip_address', nullable: true }) ipAddress?: string;
  @Column({ name: 'user_agent', nullable: true }) userAgent?: string;
  @Column({ name: 'correlation_id', nullable: true }) correlationId?: string;

  @CreateDateColumn({ type: 'timestamptz' }) createdAt!: Date;
}
