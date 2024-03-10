import { Component, Input, SimpleChanges } from '@angular/core';
import { clickCloseBtnModal } from '../../../utils/closeModal';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HARDWARE_PRIORITIES } from '../../../../models/HardwareModel';

@Component({
  selector: 'app-hardware-filter-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './hardware-filter-modal.component.html',
})
export class HardwareFilterModalComponent {
  @Input({ required: true }) formId!: string;
  btnCloseModalId = '';
  hardwarePriorities = HARDWARE_PRIORITIES;

  hardwareFilterForm = new FormGroup({
    minStock: new FormControl(0),
    maxStock: new FormControl(0),
    minCost: new FormControl(0),
    maxCost: new FormControl(0),
    priority: new FormControl(''),
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
    let f = this.hardwareFilterForm.value as Record<string, string>;

    for (const key in f) {
      if (Boolean(f[key])) {
        validFilter[key] = f[key];
      }
    }

    this.router.navigate(['/dashboard/hardwares'], {
      queryParams: validFilter,
    });
    clickCloseBtnModal(this.btnCloseModalId);
  }

  refreshFilter() {
    this.hardwareFilterForm.reset();
  }
}
