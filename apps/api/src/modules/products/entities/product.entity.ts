import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ length: 120 }) name!: string;
  @Column({ type: 'text', nullable: true }) description?: string;
  @Column({ length: 30, default: 'concept' }) lifecycle!: 'concept' | 'development' | 'live' | 'sunset';
  @Column({ length: 60, nullable: true }) businessModel?: string;
  @Column({ name: 'owner_id', type: 'uuid' }) ownerId!: string;
  @Column({ name: 'organization_id', type: 'uuid', nullable: true }) organizationId?: string;
  @CreateDateColumn({ type: 'timestamptz' }) createdAt!: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) updatedAt!: Date;
}
