import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: []
})
export class MenuComponent {
  activeItem: number = 0
  largeMenuDisplayed: boolean = true
  smallScreen: boolean = false

  @Output() sectionSelected = new EventEmitter<string>()

  _screenWidth: number
  @Input() set screenWidth(value: number) {
    this._screenWidth = value
    this.checkSmallScreen()
  }

  checkSmallScreen() {
    if (this._screenWidth <= 640) {
      this.smallScreen = true
      this.largeMenuDisplayed = false
    }
    else if (this._screenWidth <= 800) {
      this.largeMenuDisplayed = false
      this.smallScreen = false
    }

    else {
      this.smallScreen = false
      this.largeMenuDisplayed = true
    }
  }

  setActiveItem(itemIndex: number, name: string) {
    this.activeItem = itemIndex
    this.sectionSelected.emit(name)
  }

  hideMenu() {
    this.largeMenuDisplayed = false
  }

  showMenu() {
    this.largeMenuDisplayed = true
  }
}
