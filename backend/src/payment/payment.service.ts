import { Injectable } from '@nestjs/common';
import { Payment, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PaymentService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(data: Prisma.PaymentCreateInput): Promise<Payment> {
    return this.dbService.payment.create({
      data,
    });
  }

  async update(
    id: number,
    payment: Prisma.PaymentCreateInput,
  ): Promise<Payment> {
    return this.dbService.payment.update({
      where: { id: id },
      data: payment,
    });
  }

  async delete(id: number): Promise<Payment> {
    return this.dbService.payment.delete({
      where: { id: id },
    });
  }

  async getAll(): Promise<Payment[]> {
    return this.dbService.payment.findMany();
  }

  async getById(id: number): Promise<Payment> {
    return this.dbService.payment.findUnique({
      where: { id: id },
    });
  }
}
