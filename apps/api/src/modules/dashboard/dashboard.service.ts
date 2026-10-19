import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '@modules/projects/entities/project.entity';
import { Task } from '@modules/tasks/entities/task.entity';
import { Approval } from '@modules/approvals/entities/approval.entity';
import { Expense } from '@modules/finance/entities/expense.entity';
import { Lead } from '@modules/crm/entities/lead.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Project) private readonly projects: Repository<Project>,
    @InjectRepository(Task) private readonly tasks: Repository<Task>,
    @InjectRepository(Approval) private readonly approvals: Repository<Approval>,
    @InjectRepository(Expense) private readonly expenses: Repository<Expense>,
    @InjectRepository(Lead) private readonly leads: Repository<Lead>,
  ) {}

  async executiveSnapshot() {
    const [
      activeProjects, tasksTodo, overdueTasks, pendingApprovals,
      pendingExpenses, openLeads,
    ] = await Promise.all([
      this.projects.count({ where: { status: 'active' } }),
      this.tasks.count({ where: { status: 'todo' } }),
      this.tasks
        .createQueryBuilder('t')
        .where('t.due_date < NOW()')
        .andWhere('t.status NOT IN (:...done)', { done: ['done', 'cancelled'] })
        .getCount(),
      this.approvals.count({ where: { status: 'pending' } }),
      this.expenses.count({ where: { status: 'pending' } }),
      this.leads.count({ where: { status: 'new' } }),
    ]);

    return {
      generatedAt: new Date().toISOString(),
      companyHealth: {
        activeProjects,
        tasksTodo,
        overdueTasks,
        pendingApprovals,
        pendingExpenses,
        openLeads,
      },
      alerts: [
        overdueTasks > 0 && { level: 'warning', message: `${overdueTasks} overdue tasks` },
        pendingApprovals > 0 && { level: 'info', message: `${pendingApprovals} approvals awaiting action` },
      ].filter(Boolean),
    };
  }
}
