import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core'
import { Reservation } from 'src/app/utils/app-reservation'
import * as _ from 'lodash'
import { ReservationsService } from '../reservations.service'
import { FormControl, FormGroup, NgForm } from '@angular/forms'
import { Reservation_Source, Reservation_Status, Expense_Type, Reservation_PaymentType} from '../../utils/reservation.constants'

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: []
})

export class ReservationFormComponent implements OnInit {
  @Input() isNewReservation: boolean
  @Input() reservationData: Reservation
  @Output() closeForm = new EventEmitter()

  reservationForm: FormGroup

  renters: JSON[] = []
  renterDropdownOpen: boolean = false
  selectedRenter: JSON

  reservationSources: string[] = Object.values(Reservation_Source)
  reservationStatuses: string[] = Object.values(Reservation_Status)
  paymentTypes: string[] = Object.values(Reservation_PaymentType)

  constructor(private reservationsService: ReservationsService) {
    reservationsService.getAllRenters().subscribe((data) => {
      this.renters = data as JSON[]
      this.selectedRenter = this.renters.find(x => x["name"] == this.reservationData.renterName)
    })
  }

  ngOnInit(): void {
    this.reservationForm = new FormGroup({
      'reservationDateInformation': new FormGroup({
          'startDate': new FormControl(this.dateToString(this.reservationData.startDate)),
          'endDate': new FormControl(this.dateToString(this.reservationData.endDate))
      }),
      'guestName': new FormControl(this.reservationData.guestName),
      'guestContactInformation': new FormGroup({
          'guestEmail': new FormControl(this.reservationData.guestEmail),
          'guestPhone': new FormControl(this.reservationData.guestPhone)
      }),
      'persons': new FormControl(this.reservationData.persons),
      'amount': new FormControl(this.reservationData.amount),
      'status': new FormControl(),
      'renter': new FormControl(this.reservationData.renterName),
      'bookingDate': new FormControl(this.dateToString(this.reservationData.bookingDate)),
      'vrboId': new FormControl(this.reservationData.vrboReservationId),
      'description': new FormControl(this.reservationData.startDate)
    })
  }

  dateToString(date: Date) {
    if (date == null) return null
    const dateInformation = Reservation.getDateInformation(date)
    return dateInformation[2] + "-" + dateInformation[1] + "-" + dateInformation[0]
  }

  selectRenter(renter: JSON) {
    this.renterDropdownOpen = false
    this.selectedRenter = renter
    this.reservationForm.patchValue({
      'renter': this.selectedRenter["name"]
    })
  }
  
  onSubmit() {
    console.log("SUBMIT")
    this.setConstantKeys()
    const reservation = new Reservation()
    reservation.renterId = this.selectedRenter["id"]
    reservation.startDate = this.reservationForm.value["reservationDateInformation"]["startDate"]
    reservation.endDate = this.reservationForm.value["reservationDateInformation"]["endDate"]
    reservation.bookingDate = this.reservationForm.value["bookingDate"]
    reservation.guestName = this.reservationForm.value["guestName"]
    reservation.amount = this.reservationForm.value["amount"]
    reservation.persons = this.reservationForm.value["persons"]
    reservation.guestPhone = this.reservationForm.value["guestContactInformation"]["guestPhone"]
    reservation.guestEmail = this.reservationForm.value["guestContactInformation"]["guestEmail"]
    reservation.reservationSource = this.reservationForm.value["source"]
    reservation.vrboReservationId = this.reservationForm.value["vrboId"]
    reservation.description = this.reservationForm.value["description"]
    reservation.paymentType = this.reservationForm.value["paymentType"]

    reservation.status = this.reservationForm.value["status"]

    if (this.isNewReservation) {
      console.log("JAS")
      this.reservationsService.createReservation(reservation)
    }
    else {
      console.log("HERE")
      reservation.id = this.reservationData.id
      this.reservationsService.patchReservation(reservation)
    }
    this.closeForm.emit()
  }

  setConstantKeys() {
    const paymentTypeKey = this.reservationsService
      .getReservationConstantKey(Reservation_PaymentType, this.reservationForm.value["paymentType"])
    const sourceKey = this.reservationsService
      .getReservationConstantKey(Reservation_Source, this.reservationForm.value["source"])  
    const statusKey = this.reservationsService
      .getReservationConstantKey(Reservation_Status, this.reservationForm.value["status"])

    this.reservationForm.patchValue({
      'paymentType': paymentTypeKey,
      'source': sourceKey,
      'status': statusKey
    })
  }
}


