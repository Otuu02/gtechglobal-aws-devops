import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('features')
export class Feature {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ name: 'product_id', type: 'uuid' }) productId!: string;
  @Column({ length: 160 }) title!: string;
  @Column({ type: 'text', nullable: true }) description?: string;
  @Column({ length: 30, default: 'proposed' })
  status!: 'proposed' | 'discovery' | 'planned' | 'development' | 'qa' | 'released' | 'deprecated';
  @Column({ length: 20, default: 'medium' }) priority!: 'low' | 'medium' | 'high' | 'critical';
  @CreateDateColumn({ type: 'timestamptz' }) createdAt!: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) updatedAt!: Date;
}
