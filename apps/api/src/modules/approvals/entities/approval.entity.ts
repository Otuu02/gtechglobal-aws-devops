import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'escalated';

@Entity('approvals')
export class Approval {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ length: 200 }) title!: string;
  @Column({ type: 'text', nullable: true }) description?: string;

  @Index()
  @Column({ length: 40 }) type!: string; // budget, purchase, contract, launch, leave

  @Column({ type: 'numeric', precision: 15, scale: 2, nullable: true }) amount?: string;

  @Column({ name: 'requester_id', type: 'uuid' }) requesterId!: string;

  @Index()
  @Column({ name: 'approver_id', type: 'uuid' }) approverId!: string;

  @Index()
  @Column({ length: 20, default: 'pending' }) status!: ApprovalStatus;

  @Column({ type: 'text', nullable: true }) comments?: string;
  @Column({ name: 'entity_type', length: 40, nullable: true }) entityType?: string;
  @Column({ name: 'entity_id', type: 'uuid', nullable: true }) entityId?: string;
  @Column({ name: 'due_at', type: 'timestamptz', nullable: true }) dueAt?: Date;

  @CreateDateColumn({ type: 'timestamptz' }) createdAt!: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) updatedAt!: Date;
}
