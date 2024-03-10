import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { clickCloseBtnModal } from '../../../utils/closeModal';
import { Router } from '@angular/router';
import { INVENTORY_TYPES } from '../../../../models/InventoryModel';

@Component({
  selector: 'app-inventory-filter-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './inventory-filter-modal.component.html',
})
export class InventoryFilterModalComponent {
  @Input({ required: true }) formId!: string;
  btnCloseModalId = '';
  inventoryTypes = INVENTORY_TYPES;

  inventoryFilterForm = new FormGroup({
    minStock: new FormControl(0),
    maxStock: new FormControl(0),
    minCost: new FormControl(0),
    maxCost: new FormControl(0),
    type: new FormControl(''),
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
    let f = this.inventoryFilterForm.value as Record<string, string>;

    for (const key in f) {
      if (Boolean(f[key])) {
        validFilter[key] = f[key];
      }
    }

    this.router.navigate(['/dashboard/inventories'], {
      queryParams: validFilter,
    });
    clickCloseBtnModal(this.btnCloseModalId);
  }

  refreshFilter() {
    this.inventoryFilterForm.reset();
  }
}
