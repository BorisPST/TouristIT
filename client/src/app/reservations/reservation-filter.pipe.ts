import { Pipe, PipeTransform } from '@angular/core';
import { Reservation } from '../utils/app-reservation';

@Pipe({
  name: 'reservationFilter'
})
export class ReservationFilterPipe implements PipeTransform {

  transform(items: Reservation[], value: string): Reservation[] {
    if (!value || !items) return items
    console.log(items.map(x => x.queryString))
    return items.filter(x => x.queryString.toLowerCase().includes(value.toLowerCase()))
  }

}
