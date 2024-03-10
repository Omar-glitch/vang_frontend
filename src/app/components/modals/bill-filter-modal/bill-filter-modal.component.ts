import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { clickCloseBtnModal } from '../../../utils/closeModal';
import { REPAIR_TYPES } from '../../../../models/RepairModel';

@Component({
  selector: 'app-bill-filter-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './bill-filter-modal.component.html',
})
export class BillFilterModalComponent {
  @Input({ required: true }) formId!: string;
  btnCloseModalId = '';
  billTypes = REPAIR_TYPES;

  billFilterForm = new FormGroup({
    minDate: new FormControl(''),
    maxDate: new FormControl(''),
    minAmount: new FormControl(0),
    maxAmount: new FormControl(0),
    type: new FormControl(''),
    paid: new FormControl(''),
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
    let f = this.billFilterForm.value as Record<string, string>;

    for (const key in f) {
      if (Boolean(f[key])) {
        validFilter[key] = f[key];
      }
    }

    this.router.navigate(['/dashboard/bills'], {
      queryParams: validFilter,
    });
    clickCloseBtnModal(this.btnCloseModalId);
  }

  refreshFilter() {
    this.billFilterForm.reset();
  }
}
