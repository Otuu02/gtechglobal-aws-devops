import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';

export type ProjectStatus = 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ length: 160 }) name!: string;
  @Column({ type: 'text', nullable: true }) description?: string;

  @Index()
  @Column({ length: 20, default: 'active' }) status!: ProjectStatus;

  @Column({ type: 'numeric', precision: 15, scale: 2, nullable: true }) budget?: string;
  @Column({ name: 'start_date', type: 'date', nullable: true }) startDate?: string;
  @Column({ name: 'end_date', type: 'date', nullable: true }) endDate?: string;

  @Column({ name: 'owner_id', type: 'uuid' }) ownerId!: string;
  @Column({ name: 'department_id', type: 'uuid', nullable: true }) departmentId?: string;
  @Column({ name: 'organization_id', type: 'uuid', nullable: true }) organizationId?: string;

  @CreateDateColumn({ type: 'timestamptz' }) createdAt!: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) updatedAt!: Date;
}
