import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { Project } from '@modules/projects/entities/project.entity';
import { Task } from '@modules/tasks/entities/task.entity';
import { Approval } from '@modules/approvals/entities/approval.entity';
import { Expense } from '@modules/finance/entities/expense.entity';
import { Lead } from '@modules/crm/entities/lead.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Task, Approval, Expense, Lead])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
