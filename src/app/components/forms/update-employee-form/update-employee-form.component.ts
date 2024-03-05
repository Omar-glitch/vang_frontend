import { Component, Input, SimpleChanges } from '@angular/core';
import {
  DEFAULT_EMPLOYEE,
  EMPLOYEE_ROLES,
  EmployeeModel,
} from '../../../../models/EmployeeModel';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  errorOf,
  numberValidator,
  stringValidator,
} from '../../../utils/validators';
import { HotToastService } from '@ngneat/hot-toast';
import deepEqual from 'deep-equal';
import axios from 'axios';
import { clickCloseBtnModal } from '../../../utils/closeModal';
import getErrorMessage from '../../../utils/errors';
import { BACKEND_URL } from '../../../utils/constants';

@Component({
  selector: 'app-update-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-employee-form.component.html',
  styleUrl: './update-employee-form.component.css',
})
export class UpdateEmployeeFormComponent {
  @Input({ required: true }) formId = '';
  @Input({ required: true }) formValues: EmployeeModel = DEFAULT_EMPLOYEE;
  employeeRoles = EMPLOYEE_ROLES;
  @Input() onSuccessSubmit?: () => void;
  updateEmployeeForm = new FormGroup({
    name: new FormControl(this.formValues.name, [
      stringValidator({ minLength: 3, maxLength: 32 }),
    ]),
    age: new FormControl(this.formValues.age, [
      numberValidator({ min: 16, max: 80 }),
    ]),
    role: new FormControl(EMPLOYEE_ROLES[0] as string, [
      stringValidator({
        minLength: 4,
        maxLength: 32,
        list: EMPLOYEE_ROLES,
      }),
    ]),
    direction: new FormControl(this.formValues.direction, [
      stringValidator({ minLength: 6, maxLength: 100 }),
    ]),
    email: new FormControl(this.formValues.email, [
      stringValidator({
        minLength: 8,
        maxLength: 54,
        regex: {
          value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          message: 'Ej. omar@gmail.com',
        },
      }),
    ]),
    phone: new FormControl(this.formValues.phone, [
      stringValidator({
        minLength: 4,
        maxLength: 32,
        regex: { value: /^\d{4}-\d{4}$/, message: 'Ej. 6589-4578' },
      }),
    ]),
  });
  prevForm = this.updateEmployeeForm.value;
  btnCloseModalId = '';
  sendingForm = false;

  constructor(private toast: HotToastService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formValues']) {
      const f = changes['formValues'].currentValue as EmployeeModel;
      this.updateEmployeeForm.setValue({
        age: f.age,
        direction: f.direction,
        email: f.email,
        name: f.name,
        phone: f.phone,
        role: f.role,
      });
      this.prevForm = this.updateEmployeeForm.value;
    }
    if (changes['formId']) {
      this.btnCloseModalId = `${this.formId}-close-btn`;
    }
  }

  showError = (field: string) => {
    return errorOf(field, this.updateEmployeeForm);
  };

  onSubmit = async () => {
    if (deepEqual(this.updateEmployeeForm.value, this.prevForm)) {
      this.toast.error('No hay nada que actualizar');
      return;
    }
    this.sendingForm = true;
    try {
      await axios.put(
        `${BACKEND_URL}/employees/${this.formValues._id}`,
        this.updateEmployeeForm.value
      );
      clickCloseBtnModal(this.btnCloseModalId);
      if (this.onSuccessSubmit) this.onSuccessSubmit();
      this.toast.success('Empleado actualizado');
    } catch (e) {
      this.toast.error(getErrorMessage(e));
    }
    this.sendingForm = false;
  };
}
