import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid') id!: string;

  @Index()
  @Column({ name: 'entity_type', length: 40 }) entityType!: string;

  @Index()
  @Column({ name: 'entity_id', type: 'uuid' }) entityId!: string;

  @Column({ name: 'author_id', type: 'uuid' }) authorId!: string;
  @Column({ type: 'text' }) body!: string;

  @CreateDateColumn({ type: 'timestamptz' }) createdAt!: Date;
}
