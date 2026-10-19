import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('budgets')
export class Budget {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ length: 120 }) name!: string;
  @Column({ name: 'period_start', type: 'date' }) periodStart!: string;
  @Column({ name: 'period_end', type: 'date' }) periodEnd!: string;
  @Column({ type: 'numeric', precision: 15, scale: 2 }) amount!: string;
  @Column({ name: 'spent_amount', type: 'numeric', precision: 15, scale: 2, default: 0 }) spentAmount!: string;
  @Column({ length: 3, default: 'NGN' }) currency!: string;
  @Column({ name: 'business_unit', nullable: true }) businessUnit?: string;
  @CreateDateColumn({ type: 'timestamptz' }) createdAt!: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) updatedAt!: Date;
}
