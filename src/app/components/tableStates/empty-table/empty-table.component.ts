import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-table',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './empty-table.component.html',
})
export class EmptyTableComponent {
  @Input() message?: string;
}
