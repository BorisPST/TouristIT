import { Injectable } from '@nestjs/common';
import { CostCenter, Expense, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CostCenterService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(data: Prisma.CostCenterCreateInput): Promise<CostCenter> {
    return this.dbService.costCenter.create({
      data,
    });
  }

  async update(
    id: number,
    costCenter: Prisma.CostCenterCreateInput,
  ): Promise<CostCenter> {
    return this.dbService.costCenter.update({
      where: { id: Number(id) },
      data: costCenter,
    });
  }

  async delete(id: number): Promise<CostCenter> {
    return this.dbService.costCenter.delete({
      where: { id: Number(id) },
    });
  }

  async getAll(): Promise<CostCenter[]> {
    return this.dbService.costCenter.findMany();
  }

  async getById(id: number): Promise<CostCenter> {
    return this.dbService.costCenter.findUnique({
      where: { id: Number(id) },
    });
  }
}
