import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../utils/app-reservation';
import { Reservation_PaymentType, Reservation_Source, Reservation_Status } from '../utils/reservation.constants';
import { property } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
    apiUrl = "http://localhost:3000"

    constructor(private http: HttpClient){}

    getReservationConstantKey(
      constantType: typeof Reservation_PaymentType | typeof Reservation_Source | typeof Reservation_Status, 
      value: string
    ) {
      const indexOfValue = Object.values(constantType).indexOf(value);
      const key = Object.keys(constantType)[indexOfValue];
      return key;
    }

    getPaymentTypeValue(key: string) {
      return Reservation_PaymentType[key]
    }

    getSourceValue(key: string) {
      return Reservation_Source[key]
    }

    getStatusValue(key: string) {
      return Reservation_Status[key]
    }

    priceToString(price: number) {
      const priceString = price.toString()
      let result = ""
      for (let i = 0; i < priceString.length; i ++) {
        if ((i - 1) % 3 == 0)
          result += "."
        result += priceString.charAt(i)
      }
      return result
    }

    getAllReservations() {
      return this.http.get(`${this.apiUrl}/reservation`)
    }

    getReservationsByYear(year: number) {
      return this.http.get(`${this.apiUrl}/reservation/year/${year}`)
    }

    getAllRenters() {
      return this.http.get(`${this.apiUrl}/renter`)
    }

    getReservationPayments(id: number) {
      return this.http.get(`${this.apiUrl}/reservation/${id}/payments`)
    }

    addReservationPayment(reservationId: number, date: Date, amount: number) {
      const paymentJSON = {
        reservationId: reservationId,
        date: date,
        amount: amount
      }
      return this.http.post(`${this.apiUrl}/payment`, paymentJSON)
    }

    deleteReservationPayment(paymentId: number) {
      this.http.delete(`${this.apiUrl}/payment/${paymentId}`).subscribe((data) => console.log(data))
    }

    getReservationJSON(reservation: Reservation) {
      return {
        renterId: reservation.renterId,
        startDate: new Date(reservation.startDate),
        endDate: new Date(reservation.endDate),
        bookingDate: new Date(reservation.bookingDate),
        guestName: reservation.guestName,
        guestEmail: reservation.guestEmail,
        guestPhone: reservation.guestPhone,
        amount: reservation.amount,
        source: reservation.reservationSource,
        description: reservation.description,
        persons: reservation.persons,
        paymentType: reservation.paymentType,
        status: reservation.status,
        vrboReservationId: reservation.vrboReservationId,
        propertyId: 1
      }
    }

    createReservation(reservation: Reservation) {
      const reservationJSON = this.getReservationJSON(reservation)
      this.http.post(`${this.apiUrl}/reservation`, reservationJSON).subscribe((data) => console.log(data))
    }

    patchReservation(reservation: Reservation) {
      const reservationJSON = this.getReservationJSON(reservation)
      this.http.patch(`${this.apiUrl}/reservation/${reservation.id}`, reservationJSON).subscribe((data) => console.log(data))
    }

    deleteReservation(id: number) {
      this.http.delete(`${this.apiUrl}/reservation/${id}`).subscribe((data) => console.log(data))
    }
}