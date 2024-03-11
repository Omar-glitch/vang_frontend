import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MinInventoryButtonComponent } from '../buttons/min-inventory-button/min-inventory-button.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, MinInventoryButtonComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  DROPDOWN_BUTTON_ID = 'dropdown_navbar_toggle';

  hideDropdown = () => {
    document.getElementById(this.DROPDOWN_BUTTON_ID)?.click();
  };
}
