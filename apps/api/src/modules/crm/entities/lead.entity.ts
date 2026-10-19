import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';

@Entity('leads')
export class Lead {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ length: 120 }) name!: string;
  @Column({ nullable: true }) email?: string;
  @Column({ nullable: true }) phone?: string;
  @Column({ nullable: true }) company?: string;
  @Column({ nullable: true }) source?: string;

  @Index()
  @Column({ length: 20, default: 'new' }) status!: LeadStatus;

  @Column({ name: 'estimated_value', type: 'numeric', precision: 15, scale: 2, nullable: true })
  estimatedValue?: string;

  @Column({ name: 'owner_id', type: 'uuid' }) ownerId!: string;
  @Column({ name: 'next_action', nullable: true }) nextAction?: string;
  @Column({ name: 'next_action_at', type: 'timestamptz', nullable: true }) nextActionAt?: Date;

  @CreateDateColumn({ type: 'timestamptz' }) createdAt!: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) updatedAt!: Date;
}
