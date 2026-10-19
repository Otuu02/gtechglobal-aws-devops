import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ length: 40, unique: true }) number!: string;
  @Column({ name: 'client_id', type: 'uuid', nullable: true }) clientId?: string;
  @Column({ type: 'numeric', precision: 15, scale: 2 }) amount!: string;
  @Column({ length: 3, default: 'NGN' }) currency!: string;
  @Column({ length: 20, default: 'draft' }) status!: 'draft' | 'sent' | 'paid' | 'overdue' | 'void';
  @Column({ name: 'due_date', type: 'date', nullable: true }) dueDate?: string;
  @Column({ name: 'paid_at', type: 'timestamptz', nullable: true }) paidAt?: Date;
  @CreateDateColumn({ type: 'timestamptz' }) createdAt!: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) updatedAt!: Date;
}
