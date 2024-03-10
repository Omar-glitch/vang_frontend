import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { clickCloseBtnModal } from '../../../utils/closeModal';

@Component({
  selector: 'app-client-filter-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './client-filter-modal.component.html',
})
export class ClientFilterModalComponent {
  @Input({ required: true }) formId!: string;
  btnCloseModalId = '';

  clientFilterForm = new FormGroup({
    order: new FormControl(''),
  });

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formId']) {
      this.btnCloseModalId = `${this.formId}-close-btn`;
    }
  }

  onSubmit() {
    let validFilter: Record<string, string> = {};
    let f = this.clientFilterForm.value as Record<string, string>;

    for (const key in f) {
      if (Boolean(f[key])) {
        validFilter[key] = f[key];
      }
    }

    this.router.navigate(['/dashboard/clients'], {
      queryParams: validFilter,
    });
    clickCloseBtnModal(this.btnCloseModalId);
  }

  refreshFilter() {
    this.clientFilterForm.reset();
  }
}
