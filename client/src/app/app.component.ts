import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'touristit-client';
  darkModeEnabled: boolean = false
  screenWidth: number
  selectedSection: string

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth

  }

  constructor() {
    this.screenWidth = window.innerWidth
    this.selectedSection = "reservations"
  }

  toggleDarkMode() {
    this.darkModeEnabled = !this.darkModeEnabled
  }

  selectSection(section: string) {
    this.selectedSection = section
  }
}
