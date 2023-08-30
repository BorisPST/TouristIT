import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ReservationsService } from '../reservations.service';
import { Reservation } from 'src/app/utils/app-reservation';
import { AbstractControl, FormControl, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-payments-modal',
  templateUrl: './payments-modal.component.html',
  styleUrls: []
})
export class PaymentsModalComponent implements OnInit {
  @Output() paymentAdded = new EventEmitter<number>()
  @Output() paymentDeleted = new EventEmitter<number>()

  payments: JSON[]
  remainingAmount: number
  overTotalAmount: boolean = false
  inputAmount: number

  paymentForm: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) public reservationData: Reservation, private reservationService: ReservationsService) {
    this.reservationService.getReservationPayments(this.reservationData.id).subscribe((data) => {
      this.payments = (data as JSON[]).sort((a: JSON, b: JSON) => new Date(a["date"]).getTime() - new Date(b["date"]).getTime())
    })
    this.remainingAmount = reservationData.amount - reservationData.payout
  }

  ngOnInit() {
    this.paymentForm = new FormGroup({
      'date': new FormControl(),
      'amount': new FormControl()
    })
  }

  paymentAmountValidator(form: FormGroup): ValidatorFn {
    return (control: FormControl): ValidationErrors | null => {
      if (!control || !control.parent) {
        return null;
      }
      console.log(this.inputAmount)
      if (form.value["amount"] > this.remainingAmount) {
        return { 'paymentAmountInvalid' : true }
      }
      return null
    };
  }

  addPayment() {
    const formValues = this.paymentForm.value
    const amount = formValues["amount"]
    
    this.reservationService.addReservationPayment(
          this.reservationData.id,
          new Date(formValues["date"]),
          amount).subscribe((data) => this.payments.push(data as JSON))
    this.remainingAmount -= amount
    this.paymentAdded.emit(amount)
    this.resetPaymentForm()
  }

  resetPaymentForm() {
    this.paymentForm.patchValue({
      'date': null,
      'amount': ""
    })
  }

  deletePayment(index: number) {
    this.paymentDeleted.emit(this.payments[index]["amount"])
    this.reservationService.deleteReservationPayment(this.payments[index]["id"])
    this.payments.splice(index, 1)
    this.remainingAmount += this.payments[index]["amount"]
  }
}
