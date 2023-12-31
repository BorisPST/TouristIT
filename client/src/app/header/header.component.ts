import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent {
  @Output() onThemeChanged = new EventEmitter();

  changeTheme() {
    this.onThemeChanged.emit();
  }
}
