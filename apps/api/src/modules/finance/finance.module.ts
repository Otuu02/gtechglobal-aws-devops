import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinanceService } from './finance.service';
import { FinanceController } from './finance.controller';
import { Expense } from './entities/expense.entity';
import { Budget } from './entities/budget.entity';
import { Invoice } from './entities/invoice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expense, Budget, Invoice])],
  controllers: [FinanceController],
  providers: [FinanceService],
  exports: [FinanceService],
})
export class FinanceModule {}
