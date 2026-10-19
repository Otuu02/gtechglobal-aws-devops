import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './entities/expense.entity';
import { Budget } from './entities/budget.entity';
import { Invoice } from './entities/invoice.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Injectable()
export class FinanceService {
  constructor(
    @InjectRepository(Expense) private readonly expenses: Repository<Expense>,
    @InjectRepository(Budget) private readonly budgets: Repository<Budget>,
    @InjectRepository(Invoice) private readonly invoices: Repository<Invoice>,
  ) {}

  // Expenses
  createExpense(dto: CreateExpenseDto) {
    return this.expenses.save(this.expenses.create(dto));
  }
  listExpenses(status?: string) {
    return this.expenses.find({
      where: status ? { status: status as any } : {},
      order: { createdAt: 'DESC' },
    });
  }
  async approveExpense(id: string) {
    const e = await this.expenses.findOne({ where: { id } });
    if (!e) throw new NotFoundException(`Expense ${id} not found`);
    e.status = 'approved';
    return this.expenses.save(e);
  }

  // Budgets
  listBudgets() { return this.budgets.find({ order: { periodStart: 'DESC' } }); }

  // Invoices
  listInvoices(status?: string) {
    return this.invoices.find({
      where: status ? { status: status as any } : {},
      order: { createdAt: 'DESC' },
    });
  }

  async summary() {
    const [expenses, budgets, invoices] = await Promise.all([
      this.expenses.find(),
      this.budgets.find(),
      this.invoices.find(),
    ]);
    const totalExpenses = expenses.reduce((s, e) => s + Number(e.amount), 0);
    const totalBudget = budgets.reduce((s, b) => s + Number(b.amount), 0);
    const spent = budgets.reduce((s, b) => s + Number(b.spentAmount), 0);
    const receivables = invoices
      .filter((i) => i.status === 'sent' || i.status === 'overdue')
      .reduce((s, i) => s + Number(i.amount), 0);

    return {
      totalExpenses,
      totalBudget,
      budgetUsed: spent,
      budgetRemaining: totalBudget - spent,
      receivables,
      invoiceCount: invoices.length,
    };
  }
}
