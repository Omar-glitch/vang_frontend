import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {}
