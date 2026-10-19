import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ length: 120 }) name!: string;
  @Column({ nullable: true }) description?: string;
  @Column({ name: 'department_id', type: 'uuid' }) departmentId!: string;
  @Column({ name: 'lead_id', type: 'uuid', nullable: true }) leadId?: string;
}
