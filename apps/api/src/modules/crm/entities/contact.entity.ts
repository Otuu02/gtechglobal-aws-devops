import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ length: 120 }) fullName!: string;
  @Column({ nullable: true }) email?: string;
  @Column({ nullable: true }) phone?: string;
  @Column({ nullable: true }) company?: string;
  @Column({ nullable: true }) role?: string;
  @CreateDateColumn({ type: 'timestamptz' }) createdAt!: Date;
}
