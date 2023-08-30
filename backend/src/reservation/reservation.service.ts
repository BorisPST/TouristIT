import { Injectable } from '@nestjs/common';
import {
  Payment,
  Prisma,
  Reservation,
  Reservation_Assistance,
  Reservation_Provision,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { DatabaseService } from 'src/database/database.service';

export class ReservationPayout {
  reservation: Reservation;
  payout: Decimal;

  constructor(reservation: Reservation, payout: Decimal) {
    this.reservation = reservation;
    this.payout = payout;
  }
}

@Injectable()
export class ReservationService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(data: Prisma.ReservationCreateInput): Promise<Reservation> {
    return this.dbService.reservation.create({
      data,
    });
  }

  async update(
    id: number,
    reservation: Prisma.ReservationCreateInput,
  ): Promise<Reservation> {
    return this.dbService.reservation.update({
      where: { id: Number(id) },
      data: reservation,
    });
  }

  async delete(id: number): Promise<Reservation> {
    return this.dbService.reservation.delete({
      where: { id: Number(id) },
    });
  }

  async getAll(): Promise<ReservationPayout[]> {
    const reservations = await this.dbService.reservation.findMany({
      include: {
        renter: {
          select: {
            name: true,
          },
        },
      },
    });
    return this.getReservationsPayouts(reservations);
  }

  async getById(id: number): Promise<ReservationPayout> {
    const reservation = await this.dbService.reservation.findUnique({
      where: { id: Number(id) },

      include: {
        renter: {
          select: {
            name: true,
          },
        },
      },
    });
    return this.getReservationPayout(reservation);
  }

  async getByVrboId(id: string): Promise<ReservationPayout> {
    const reservation = await this.dbService.reservation.findUnique({
      where: { vrboReservationId: id },

      include: {
        renter: {
          select: {
            name: true,
          },
        },
      },
    });

    return this.getReservationPayout(reservation);
  }

  async getByYear(year: number): Promise<ReservationPayout[]> {
    const startOfYear: string = year.toString() + '-01-01';
    const endOfYear: string = year.toString() + '-12-31';

    const reservations = await this.dbService.reservation.findMany({
      where: {
        startDate: {
          lte: new Date(endOfYear),
          gte: new Date(startOfYear),
        },
      },

      include: {
        renter: {
          select: {
            name: true,
          },
        },
      },
    });

    return this.getReservationsPayouts(reservations);
  }

  async search(data: {
    startDate?: Date;
    endDate?: Date;
    source?: string;
    renterId?: number;
  }): Promise<Reservation[]> {
    const arr = [];

    if (data == null) {
      return [];
    }

    if (data.startDate != null) {
      arr.push({
        startDate: {
          gte: data.startDate,
        },
      });
    }

    if (data.endDate != null) {
      arr.push({
        endDate: {
          lte: data.endDate,
        },
      });
    }

    if (data.source != null) {
      arr.push({
        source: data.source,
      });
    }

    if (data.renterId != null) {
      arr.push({
        renterId: data.renterId,
      });
    }

    return this.dbService.reservation.findMany({
      where: {
        AND: arr,
      },
    });
  }

  async createReservationAssistance(
    data: Prisma.Reservation_AssistanceCreateInput,
  ): Promise<Reservation_Assistance> {
    return this.dbService.reservation_Assistance.create({
      data,
    });
  }

  async createReservationProvision(
    data: Prisma.Reservation_ProvisionCreateInput,
  ): Promise<Reservation_Provision> {
    return this.dbService.reservation_Provision.create({
      data,
    });
  }

  async getReservationPayments(reservationId: number): Promise<Payment[]> {
    return this.dbService.payment.findMany({
      where: { reservationId: reservationId },
    });
  }

  async getReservationsPayouts(reservations: Reservation[]) {
    const result = [];

    for (const reservation of reservations) {
      const reservationPayout = await this.getReservationPayout(reservation);
      result.push(reservationPayout);
    }
    return result;
  }

  async getReservationPayout(reservation: Reservation) {
    console.log(reservation);
    const totalPayments = await this.dbService.payment.groupBy({
      by: ['reservationId'],
      where: {
        reservationId: {
          equals: reservation.id,
        },
      },
      _sum: {
        amount: true,
      },
    });

    const result = new ReservationPayout(reservation, new Decimal(0));
    if (totalPayments.length > 0) {
      result.payout = totalPayments[0]._sum.amount;
    }
    return result;
  }
}
