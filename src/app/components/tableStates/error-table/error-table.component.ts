import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-table',
  standalone: true,
  imports: [],
  templateUrl: './error-table.component.html',
})
export class ErrorTableComponent {
  @Input() message?: string;
}
