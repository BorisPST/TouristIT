import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Payment } from '@prisma/client';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  async getAllPayments(): Promise<Payment[]> {
    return this.paymentService.getAll();
  }

  @Post()
  async createPayment(
    @Body()
    data: {
      reservationId: number;
      date: Date;
      amount: number;
      reservation: { connect: { id: number } };
    },
  ): Promise<Payment> {
    return this.paymentService.create(data);
  }

  @Patch('/:id')
  async updatePayment(
    @Param('id') id: string,
    @Body()
    data: {
      reservationId: number;
      date: Date;
      amount: number;
      reservation: { connect: { id: number } };
    },
  ): Promise<Payment> {
    return this.paymentService.update(Number(id), data);
  }

  @Delete('/:id')
  async deletePayment(@Param('id') id: string): Promise<Payment> {
    return this.paymentService.delete(Number(id));
  }

  @Get('/:id')
  async getPaymentById(@Param('id') id: string): Promise<Payment> {
    return this.paymentService.getById(Number(id));
  }
}
