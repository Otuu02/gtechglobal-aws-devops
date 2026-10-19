import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done' | 'cancelled';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ length: 200 }) title!: string;
  @Column({ type: 'text', nullable: true }) description?: string;

  @Index()
  @Column({ length: 20, default: 'medium' }) priority!: TaskPriority;

  @Index()
  @Column({ length: 20, default: 'todo' }) status!: TaskStatus;

  @Column({ name: 'due_date', type: 'timestamptz', nullable: true }) dueDate?: Date;
  @Column({ name: 'assignee_id', type: 'uuid', nullable: true }) assigneeId?: string;
  @Column({ name: 'project_id', type: 'uuid', nullable: true }) projectId?: string;
  @Column({ name: 'parent_task_id', type: 'uuid', nullable: true }) parentTaskId?: string;
  @Column({ name: 'created_by', type: 'uuid' }) createdBy!: string;

  @CreateDateColumn({ type: 'timestamptz' }) createdAt!: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) updatedAt!: Date;
}
