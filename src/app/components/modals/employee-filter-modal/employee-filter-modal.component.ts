import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { clickCloseBtnModal } from '../../../utils/closeModal';
import { EMPLOYEE_ROLES } from '../../../../models/EmployeeModel';

@Component({
  selector: 'app-employee-filter-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee-filter-modal.component.html',
})
export class EmployeeFilterModalComponent {
  @Input({ required: true }) formId!: string;
  btnCloseModalId = '';
  employeeRoles = EMPLOYEE_ROLES;

  employeeFilterForm = new FormGroup({
    minAge: new FormControl(0),
    maxAge: new FormControl(0),
    role: new FormControl(''),
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
    let f = this.employeeFilterForm.value as Record<string, string>;

    for (const key in f) {
      if (Boolean(f[key])) {
        validFilter[key] = f[key];
      }
    }

    this.router.navigate(['/dashboard/employees'], {
      queryParams: validFilter,
    });
    clickCloseBtnModal(this.btnCloseModalId);
  }

  refreshFilter() {
    this.employeeFilterForm.reset();
  }
}
