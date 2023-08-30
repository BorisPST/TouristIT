import { Injectable } from '@nestjs/common';
import { Assistance, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AssistanceService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(data: Prisma.AssistanceCreateInput): Promise<Assistance> {
    return this.dbService.assistance.create({
      data,
    });
  }

  async update(
    id: number,
    assistance: Prisma.AssistanceCreateInput,
  ): Promise<Assistance> {
    return this.dbService.assistance.update({
      where: { id: Number(id) },
      data: assistance,
    });
  }

  async delete(id: number): Promise<Assistance> {
    return this.dbService.assistance.delete({
      where: { id: Number(id) },
    });
  }

  async getAll(): Promise<Assistance[]> {
    return this.dbService.assistance.findMany();
  }

  async getById(id: number): Promise<Assistance> {
    return this.dbService.assistance.findUnique({
      where: { id: Number(id) },
    });
  }
}
