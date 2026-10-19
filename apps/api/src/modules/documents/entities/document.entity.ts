import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ length: 200 }) title!: string;
  @Column({ type: 'text', nullable: true }) content?: string;

  @Index()
  @Column({ length: 40 }) type!: string; // sop, policy, contract, prd, architecture, note

  @Column({ name: 'folder_id', type: 'uuid', nullable: true }) folderId?: string;
  @Column({ name: 'owner_id', type: 'uuid' }) ownerId!: string;
  @Column({ name: 'file_url', nullable: true }) fileUrl?: string;
  @Column({ default: 1 }) version!: number;

  @Index()
  @Column({ length: 20, default: 'draft' }) status!: 'draft' | 'published' | 'archived';

  @Column({ type: 'jsonb', default: () => `'[]'` }) tags!: string[];

  @CreateDateColumn({ type: 'timestamptz' }) createdAt!: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) updatedAt!: Date;
}
