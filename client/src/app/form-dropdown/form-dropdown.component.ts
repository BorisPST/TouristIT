import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-dropdown',
  templateUrl: './form-dropdown.component.html',
  styleUrls: []
})
export class FormDropdownComponent implements OnInit {
  @Input() values: string[]
  @Input() initialValue: string
  @Input() title: string
  @Input() controlName: string
  @Input() parentFormGroup: FormGroup;

  dropdownOpen: boolean = false
  selectedValue: string

  ngOnInit(): void {
    this.selectedValue = this.initialValue
    this.parentFormGroup.addControl(this.controlName, new FormControl(this.selectedValue))
  }

  selectValue(value: string) {
    this.dropdownOpen = false
    this.selectedValue = value
  }
}
