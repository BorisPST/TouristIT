import { Injectable } from '@nestjs/common';
import { Expense, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ExpenseService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(data: Prisma.ExpenseCreateInput): Promise<Expense> {
    return this.dbService.expense.create({
      data,
    });
  }

  async update(
    id: number,
    expense: Prisma.ExpenseCreateInput,
  ): Promise<Expense> {
    return this.dbService.expense.update({
      where: { id: Number(id) },
      data: expense,
    });
  }

  async delete(id: number): Promise<Expense> {
    return this.dbService.expense.delete({
      where: { id: Number(id) },
    });
  }

  async getAll(): Promise<Expense[]> {
    return this.dbService.expense.findMany();
  }

  async getById(id: number): Promise<Expense> {
    return this.dbService.expense.findUnique({
      where: { id: Number(id) },
    });
  }
}
