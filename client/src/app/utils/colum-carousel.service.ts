import { HostListener, Injectable, OnInit } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ColumnCarouselService {
  totalNumberOfCarouselColumns: number = 7
  currentNumberOfCarouselColumns: number = 7
  innerWidth: number

  firstColumnIndex: number = 0
  lastColumnIndex: number = 6

  constructor() {
    this.setParameters()
  }

  updateInnerWidth(value: number) {
    this.innerWidth = value
    this.setParameters()
  }

  getCurrentNumberOfCarouselColumns() {
    if (this.innerWidth <= 650) return this.totalNumberOfCarouselColumns - 5

    else if (this.innerWidth <= 800) return this.totalNumberOfCarouselColumns - 4

    else if (this.innerWidth <= 950) return this.totalNumberOfCarouselColumns - 3

    else if (this.innerWidth <= 1100) return this.totalNumberOfCarouselColumns - 2

    else if (this.innerWidth <= 1250) return this.totalNumberOfCarouselColumns - 1
    
    else return this.totalNumberOfCarouselColumns
  }

  setParameters() {
    this.currentNumberOfCarouselColumns = this.getCurrentNumberOfCarouselColumns()
    this.firstColumnIndex = 0
    this.lastColumnIndex = this.currentNumberOfCarouselColumns - 1
  }

  columnDisplayed(index: number) {
    if (index >= this.firstColumnIndex && index <= this.lastColumnIndex) return true
    else return false
  }

  carouselRightDisabled() {
    if (this.lastColumnIndex >= this.totalNumberOfCarouselColumns - 1) return true
    else return false
  }

  carouselLeftDisabled() {
    if (this.firstColumnIndex <= 0) return true
    else return false
  }

  slideCarouselRight() {
    if (!this.carouselRightDisabled()) {
      this.firstColumnIndex += 1
      this.lastColumnIndex += 1
    }
  }

  slideCarouselLeft() {
    if (!this.carouselLeftDisabled()) {
      this.firstColumnIndex -= 1
      this.lastColumnIndex -= 1
    }
  }

  carouselDisplayed() {
    if (this.innerWidth <= 1250) return true
    else return false
  }
}