import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-table',
  standalone: true,
  imports: [],
  templateUrl: './loading-table.component.html',
  styleUrl: './loading-table.component.css',
})
export class LoadingTableComponent {
  @Input() message?: string;
}
