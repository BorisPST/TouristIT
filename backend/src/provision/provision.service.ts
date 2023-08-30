import { Injectable } from '@nestjs/common';
import { Prisma, Provision } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProvisionService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(data: Prisma.ProvisionCreateInput): Promise<Provision> {
    return this.dbService.provision.create({
      data,
    });
  }

  async update(
    id: number,
    provision: Prisma.ProvisionCreateInput,
  ): Promise<Provision> {
    return this.dbService.provision.update({
      where: { id: Number(id) },
      data: provision,
    });
  }

  async delete(id: number): Promise<Provision> {
    return this.dbService.provision.delete({
      where: { id: Number(id) },
    });
  }

  async getAll(): Promise<Provision[]> {
    return this.dbService.provision.findMany();
  }

  async getById(id: number): Promise<Provision> {
    return this.dbService.provision.findUnique({
      where: { id: Number(id) },
    });
  }
}
