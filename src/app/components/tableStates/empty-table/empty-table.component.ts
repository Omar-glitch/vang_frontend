import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-table',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './empty-table.component.html',
  styleUrl: './empty-table.component.css',
})
export class EmptyTableComponent {
  @Input() message?: string;
}
