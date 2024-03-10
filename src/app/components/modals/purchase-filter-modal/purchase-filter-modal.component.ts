import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { clickCloseBtnModal } from '../../../utils/closeModal';
import { PURCHASE_TYPES } from '../../../../models/PurchaseModel';

@Component({
  selector: 'app-purchase-filter-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './purchase-filter-modal.component.html',
})
export class PurchaseFilterModalComponent {
  @Input({ required: true }) formId!: string;
  btnCloseModalId = '';
  purchaseTypes = PURCHASE_TYPES;

  purchaseFilterForm = new FormGroup({
    minDate: new FormControl(''),
    maxDate: new FormControl(''),
    minCost: new FormControl(0),
    maxCost: new FormControl(0),
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
    let f = this.purchaseFilterForm.value as Record<string, string>;

    for (const key in f) {
      if (Boolean(f[key])) {
        validFilter[key] = f[key];
      }
    }

    this.router.navigate(['/dashboard/purchases'], {
      queryParams: validFilter,
    });
    clickCloseBtnModal(this.btnCloseModalId);
  }

  refreshFilter() {
    this.purchaseFilterForm.reset();
  }
}
