import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Organization } from '@modules/organizations/entities/organization.entity';

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ length: 120 }) name!: string;
  @Column({ nullable: true }) description?: string;

  @ManyToOne(() => Organization, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organization_id' })
  organization!: Organization;

  @Column({ name: 'organization_id', type: 'uuid' }) organizationId!: string;
  @Column({ name: 'head_id', type: 'uuid', nullable: true }) headId?: string;
}
