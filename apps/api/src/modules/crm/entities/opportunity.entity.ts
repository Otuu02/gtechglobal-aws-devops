import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('opportunities')
export class Opportunity {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ length: 160 }) title!: string;
  @Column({ name: 'lead_id', type: 'uuid', nullable: true }) leadId?: string;
  @Column({ type: 'numeric', precision: 15, scale: 2 }) value!: string;
  @Column({ default: 0 }) probability!: number;
  @Column({ name: 'expected_close_date', type: 'date', nullable: true }) expectedCloseDate?: string;
  @Column({ length: 20, default: 'open' }) stage!: string;
  @Column({ name: 'owner_id', type: 'uuid' }) ownerId!: string;
  @CreateDateColumn({ type: 'timestamptz' }) createdAt!: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) updatedAt!: Date;
}
