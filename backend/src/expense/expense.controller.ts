import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Expense, Expense_Type } from '@prisma/client';
import { ExpenseService } from './expense.service';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get()
  async getAllExpenses(): Promise<Expense[]> {
    return this.expenseService.getAll();
  }

  @Post()
  async createExpense(
    @Body() data: { name: string; isSeasonal: boolean; type: Expense_Type },
  ): Promise<Expense> {
    return this.expenseService.create(data);
  }

  @Patch('/:id')
  async updateExpense(
    @Param('id') id: string,
    @Body() data: { name: string; isSeasonal: boolean; type: Expense_Type },
  ): Promise<Expense> {
    return this.expenseService.update(Number(id), data);
  }

  @Delete('/:id')
  async deleteExpense(@Param('id') id: string): Promise<Expense> {
    return this.expenseService.delete(Number(id));
  }

  @Get('/:id')
  async getExpenseById(@Param('id') id: string): Promise<Expense> {
    return this.expenseService.getById(Number(id));
  }
}
