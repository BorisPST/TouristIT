import { Injectable } from '@nestjs/common';
import { Prisma, Renter } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RenterService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(data: Prisma.RenterCreateInput): Promise<Renter> {
    return this.dbService.renter.create({
      data,
    });
  }

  async update(id: number, renter: Prisma.RenterCreateInput): Promise<Renter> {
    return this.dbService.renter.update({
      where: { id: Number(id) },
      data: renter,
    });
  }

  async delete(id: number): Promise<Renter> {
    return this.dbService.renter.delete({
      where: { id: Number(id) },
    });
  }

  async getAll(): Promise<Renter[]> {
    return this.dbService.renter.findMany();
    2;
  }

  async getById(id: number): Promise<Renter> {
    return this.dbService.renter.findUnique({
      where: { id: Number(id) },
    });
  }
}
