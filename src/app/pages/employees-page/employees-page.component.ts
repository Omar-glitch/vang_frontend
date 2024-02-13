import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employees-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './employees-page.component.html',
  styleUrl: './employees-page.component.css',
})
export class EmployeesPageComponent {}
