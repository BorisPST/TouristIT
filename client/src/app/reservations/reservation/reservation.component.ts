import { Component, Input } from '@angular/core';
import { Reservation } from 'src/app/utils/app-reservation';
import { ReservationsService } from '../reservations.service';
import { ColumnCarouselService } from 'src/app/utils/colum-carousel.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: []
})
export class ReservationComponent {
  @Input() reservationData: Reservation
  @Input() isSelected: boolean
  @Input() columnCarouselService: ColumnCarouselService
  @Input() smallScreen: boolean

  constructor(private reservationsService: ReservationsService) {
  }
  
  priceToString(price: number) {
    return this.reservationsService.priceToString(price)
  }

  getReservationConstantValue(type: string, key: string) {
    switch (type) {
      case "PAYMENT_TYPE":
        return this.reservationsService.getPaymentTypeValue(key)
      case "SOURCE":
        return this.reservationsService.getSourceValue(key)
      case "STATUS":
        return this.reservationsService.getStatusValue(key)
      default:
        break
    }
  }

  getNumberOfNights() {
    const dateDifference = this.reservationData.endDate.getTime() - this.reservationData.startDate.getTime()
    const numOfNights = dateDifference / (1000 * 3600 * 24)
    return numOfNights
  }
}
