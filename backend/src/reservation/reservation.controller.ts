import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  Reservation_PaymentType,
  Reservation,
  Reservation_Assistance,
  Reservation_Provision,
  Reservation_Source,
  Reservation_Status,
  Payment,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { ReservationPayout, ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  async getAllReservations(): Promise<ReservationPayout[]> {
    return this.reservationService.getAll();
  }

  @Post()
  async createReservation(
    @Body()
    data: {
      id: number;
      renterId: number;
      renter: { connect: { id: number } };
      startDate: Date;
      endDate: Date;
      source: Reservation_Source;
      amount: Decimal;
      bookingDate: Date;
      description: string;
      guestEmail: string;
      guestName: string;
      guestPhone: string;
      paymentType: Reservation_PaymentType;
      persons: string;
      propertyId: number;
      property: { connect: { id: number } };
      status: Reservation_Status;
      vrboReservationId?: string;
    },
  ): Promise<Reservation> {
    return this.reservationService.create(data);
  }

  @Patch('/:id')
  async updateReservation(
    @Param('id') id: string,
    @Body()
    data: {
      id: number;
      renterId: number;
      renter: { connect: { id: number } };
      startDate: Date;
      endDate: Date;
      source: Reservation_Source;
      amount: Decimal;
      bookingDate: Date;
      description: string;
      guestEmail: string;
      guestName: string;
      guestPhone: string;
      paymentType: Reservation_PaymentType;
      persons: string;
      propertyId: number;
      property: { connect: { id: number } };
      status: Reservation_Status;
      vrboReservationId?: string;
    },
  ): Promise<Reservation> {
    return this.reservationService.update(Number(id), data);
  }

  @Delete('/:id')
  async deleteReservation(@Param('id') id: string): Promise<Reservation> {
    return this.reservationService.delete(Number(id));
  }

  @Get('/:id')
  async getReservationById(
    @Param('id') id: string,
  ): Promise<ReservationPayout> {
    return this.reservationService.getById(Number(id));
  }

  @Get('/vrbo/:id')
  async getReservationByVrboId(
    @Param('id') id: string,
  ): Promise<ReservationPayout> {
    return this.reservationService.getByVrboId(id);
  }

  @Get('/year/:year')
  async getReservationByYear(
    @Param('year') year: number,
  ): Promise<ReservationPayout[]> {
    return this.reservationService.getByYear(year);
  }

  @Post('search')
  async searchReservations(
    @Body()
    data: {
      startDate?: Date;
      endDate?: Date;
      source?: string;
      renterId?: number;
    },
  ): Promise<Reservation[]> {
    return this.reservationService.search(data);
  }

  @Post('add-assistance')
  async addAssistanceToReservation(
    @Body()
    data: {
      reservationId: number;
      reservation: { connect: { id: number } };
      assistanceId: number;
      assistance: { connect: { id: number } };
      startDate: Date;
      endDate: Date;
      price: Decimal;
      amountPaid?: Decimal;
      paymentType: Reservation_PaymentType;
      notes: string;
    },
  ): Promise<Reservation_Assistance> {
    return this.reservationService.createReservationAssistance(data);
  }

  @Post('add-provision')
  async addProvisionToReservation(
    @Body()
    data: {
      reservationId: number;
      reservation: { connect: { id: number } };
      provisionId: number;
      provision: { connect: { id: number } };
    },
  ): Promise<Reservation_Provision> {
    return this.reservationService.createReservationProvision(data);
  }

  @Get('/:reservationId/payments')
  async getReservationPayments(
    @Param('reservationId') reservationId: string,
  ): Promise<Payment[]> {
    return this.reservationService.getReservationPayments(
      Number(reservationId),
    );
  }
}
