import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  DROPDOWN_BUTTON_ID = 'dropdown_navbar_toggle';

  hideDropdown = () => {
    document.getElementById(this.DROPDOWN_BUTTON_ID)?.click();
  };
}
