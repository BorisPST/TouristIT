import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReservationComponent } from './reservations/reservation/reservation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ReservationFormComponent } from './reservations/reservation-form/reservation-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormDropdownComponent } from './form-dropdown/form-dropdown.component';
import { PaymentsModalComponent } from './reservations/payments-modal/payments-modal.component';
import { ReservationFilterPipe } from './reservations/reservation-filter.pipe';
import { PriceFormatPipe } from './format-pipes/price-format.pipe';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    ReservationsComponent,
    ReservationComponent,
    ReservationFormComponent,
    FormDropdownComponent,
    PaymentsModalComponent,
    ReservationFilterPipe,
    PriceFormatPipe,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
