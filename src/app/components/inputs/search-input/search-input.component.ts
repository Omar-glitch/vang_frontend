import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { stringValidator } from '../../../utils/validators';
import { HotToastService } from '@ngneat/hot-toast';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  @Input({ required: true }) name: string = '';
  @Input({ required: true }) placeholder!: string;

  constructor(private toast: HotToastService, private router: Router) {}

  searchForm = new FormGroup({
    q: new FormControl('', [stringValidator({ minLength: 2, maxLength: 16 })]),
  });

  searchSubmit = (): void => {
    if (!this.searchForm.valid) {
      this.toast.error('Escribe 2 a 16 letras');
      return;
    }
    this.router.navigate([`/dashboard/${this.name}`], {
      queryParams: { q: this.searchForm.value.q },
    });
  };
}
