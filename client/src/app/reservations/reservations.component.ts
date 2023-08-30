import { Component, ElementRef, HostListener, Input, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Reservation } from '../utils/app-reservation';
import { HttpClient } from '@angular/common/http';
import { ReservationsService } from './reservations.service';
import { PaymentsModalComponent } from './payments-modal/payments-modal.component';
import { ColumnCarouselService } from '../utils/colum-carousel.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: []
})
export class ReservationsComponent {
  @ViewChildren("reservationMenuDropdown") reservationMenuDropdown: QueryList<ElementRef>

  yearsArray: number[] = [2023, 2022, 2021, 2020, 2019, 2018, 2017]
  reservations: Reservation[] = []

  currentYearIndex: number = 0
  yearsDropdownOpen: boolean = false
  selectedReservationIndex: number = -1
  selectedReservationMenuDropdownIndex: number = -1
  reservationFormOpen: boolean = false
  creatingNewReservation: boolean = false

  inputQuery: string

  private _screenWidth: number

  @Input()
  get screenWidth(): number { return this._screenWidth; }
  set screenWidth(screenWidth: number) {
    this._screenWidth = screenWidth
    this.columnCarouselService.updateInnerWidth(screenWidth)
  }

  constructor(private dialog: MatDialog, private reservationsService: ReservationsService, private columnCarouselService: ColumnCarouselService) {
    this.getReservationsByYear()
  }

  @HostListener('document:click', ['$event'])
  closeMenuDropdown(event) {
    if(this.selectedReservationMenuDropdownIndex > -1 
      && !this.reservationMenuDropdown.toArray()[this.selectedReservationMenuDropdownIndex].nativeElement.contains(event.target)) {
      this.selectedReservationMenuDropdownIndex = -1
    } 
  }

  openDialogWithRef(ref: TemplateRef<any>) {
    this.dialog.open(ref);
    this.selectedReservationMenuDropdownIndex = -1
  }

  openPaymentsModal(index: number) {
    this.selectedReservationIndex = index
    const modalRef = this.dialog.open(PaymentsModalComponent, {
      data: this.reservations[this.selectedReservationIndex],
      width: "35rem",
    })
    modalRef.componentInstance["paymentAdded"].subscribe((amount) => this.reservations[index].payout += amount)
    modalRef.componentInstance["paymentDeleted"].subscribe((amount) => this.reservations[index].payout -= amount)
    this.selectedReservationMenuDropdownIndex = -1
  }

  selectYear(index: number) {
    this.currentYearIndex = index
    this.yearsDropdownOpen = false
    this.getReservationsByYear()
  }

  getReservationsByYear() {
    this.reservationsService.getReservationsByYear(this.yearsArray[this.currentYearIndex]).subscribe(
      (data) => {
        this.reservations = []
        for (let i = 0; i < (data as JSON[]).length; i++) {
          this.reservations.push(Reservation.parseReservation((data as JSON[])[i]))
        }
      }
    )
  }

  selectReservation(index: number) {
    if (this.selectedReservationIndex == -1 || this.selectedReservationIndex != index)
      this.selectedReservationIndex = index
    else
      this.selectedReservationIndex = -1
  }

  openReservationMenuDropdown(index: number) {
    if (this.selectedReservationMenuDropdownIndex == -1 || this.selectedReservationMenuDropdownIndex != index)
      this.selectedReservationMenuDropdownIndex = index
    else
      this.selectedReservationMenuDropdownIndex = -1
  }

  createNewReservation() {
    this.creatingNewReservation = true
    this.openReservationForm()
  }

  deleteReservation(index: number) {
    this.reservationsService.deleteReservation(this.reservations[index].id)
    this.selectedReservationIndex = -1
    this.getReservationsByYear()
  }

  editReservation(index: number) {
    this.selectedReservationIndex = index
    this.openReservationForm()
    this.selectedReservationMenuDropdownIndex = -1
  }

  getReservationFormData() {
    if(this.creatingNewReservation) return new Reservation()
    else return this.reservations[this.selectedReservationIndex]
  }

  openReservationForm() {
    this.reservationFormOpen = true
  }

  closeReservationForm() {
    this.reservationFormOpen = false
    this.creatingNewReservation = false
    this.selectedReservationIndex = -1
    this.getReservationsByYear()
  }
}