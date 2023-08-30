import { Injectable } from '@nestjs/common';
import { Prisma, Utility } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UtilityService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(data: Prisma.UtilityCreateInput): Promise<Utility> {
    return this.dbService.utility.create({
      data,
    });
  }

  async update(
    id: number,
    utility: Prisma.UtilityCreateInput,
  ): Promise<Utility> {
    return this.dbService.utility.update({
      where: { id: Number(id) },
      data: utility,
    });
  }

  async delete(id: number): Promise<Utility> {
    return this.dbService.utility.delete({
      where: { id: Number(id) },
    });
  }

  async getAll(): Promise<Utility[]> {
    return this.dbService.utility.findMany();
  }

  async getById(id: number): Promise<Utility> {
    return this.dbService.utility.findUnique({
      where: { id: Number(id) },
    });
  }
}
