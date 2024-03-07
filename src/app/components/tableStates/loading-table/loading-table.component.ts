import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-table',
  standalone: true,
  imports: [],
  templateUrl: './loading-table.component.html',
})
export class LoadingTableComponent {
  @Input() message?: string;
}
