import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FinanceService } from './finance.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';

@ApiTags('finance')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('finance')
export class FinanceController {
  constructor(private readonly svc: FinanceService) {}

  @Post('expenses') createExpense(@Body() dto: CreateExpenseDto) { return this.svc.createExpense(dto); }
  @Get('expenses') listExpenses(@Query('status') status?: string) { return this.svc.listExpenses(status); }
  @Patch('expenses/:id/approve') approve(@Param('id') id: string) { return this.svc.approveExpense(id); }

  @Get('budgets') listBudgets() { return this.svc.listBudgets(); }
  @Get('invoices') listInvoices(@Query('status') status?: string) { return this.svc.listInvoices(status); }
  @Get('summary') summary() { return this.svc.summary(); }
}
