import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('permissions')
@Index(['code'], { unique: true })
export class Permission {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ unique: true, length: 80 }) code!: string;   // e.g. users:create
  @Column({ length: 40 }) resource!: string;             // e.g. users
  @Column({ length: 20 }) action!: string;               // e.g. create
  @Column({ nullable: true }) description?: string;
}
