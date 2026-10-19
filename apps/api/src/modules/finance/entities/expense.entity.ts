import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('expenses')
export class Expense {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ length: 200 }) title!: string;
  @Column({ type: 'numeric', precision: 15, scale: 2 }) amount!: string;
  @Column({ length: 3, default: 'NGN' }) currency!: string;
  @Column({ length: 60 }) category!: string;

  @Index()
  @Column({ length: 20, default: 'pending' }) status!: 'pending' | 'approved' | 'rejected' | 'paid';

  @Column({ name: 'owner_id', type: 'uuid' }) ownerId!: string;
  @Column({ name: 'business_unit', nullable: true }) businessUnit?: string;
  @Column({ name: 'receipt_url', nullable: true }) receiptUrl?: string;

  @CreateDateColumn({ type: 'timestamptz' }) createdAt!: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) updatedAt!: Date;
}
