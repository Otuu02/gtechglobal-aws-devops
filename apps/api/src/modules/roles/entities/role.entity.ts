import {
  Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable,
} from 'typeorm';
import { Permission } from '@modules/permissions/entities/permission.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ unique: true, length: 60 }) name!: string;
  @Column({ nullable: true }) description?: string;
  @Column({ name: 'is_system', default: false }) isSystem!: boolean;

  @ManyToMany(() => Permission, { eager: true })
  @JoinTable({
    name: 'role_permissions',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions!: Permission[];
}
