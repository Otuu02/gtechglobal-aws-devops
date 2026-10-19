import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Organization } from '@modules/organizations/entities/organization.entity';
import { Department } from '@modules/departments/entities/department.entity';

@Entity('users')
@Index(['email'], { unique: true })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true, length: 255 })
  email!: string;

  @Exclude()
  @Column({ name: 'password_hash', select: false })
  passwordHash!: string;

  @Column({ name: 'first_name', length: 60 })
  firstName!: string;

  @Column({ name: 'last_name', length: 60 })
  lastName!: string;

  @Column({ length: 30, nullable: true })
  phone?: string;

  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl?: string;

  @Column({ length: 20, default: 'active' })
  status!: 'active' | 'inactive' | 'suspended';

  @Column({ name: 'mfa_enabled', default: false })
  mfaEnabled!: boolean;

  @Exclude()
  @Column({ name: 'mfa_secret', nullable: true, select: false })
  mfaSecret?: string;

  @Exclude()
  @Column({ name: 'refresh_token_hash', nullable: true, select: false })
  refreshTokenHash?: string;

  @Column({ name: 'last_login_at', type: 'timestamptz', nullable: true })
  lastLoginAt?: Date;

  @Column({ name: 'organization_id', type: 'uuid', nullable: true })
  organizationId?: string;

  @ManyToOne(() => Organization, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'organization_id' })
  organization?: Organization;

  @Column({ name: 'department_id', type: 'uuid', nullable: true })
  departmentId?: string;

  @ManyToOne(() => Department, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'department_id' })
  department?: Department;

  @Column({ length: 100, nullable: true })
  position?: string;

  @Column({ name: 'manager_id', type: 'uuid', nullable: true })
  managerId?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`.trim();
  }
}
