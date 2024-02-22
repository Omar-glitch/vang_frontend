import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  errorOf,
  numberValidator,
  stringValidator,
} from '../../../utils/validators';
import { HotToastService } from '@ngneat/hot-toast';
import axios from 'axios';
import { clickCloseBtnModal } from '../../../utils/closeModal';
import getErrorMessage from '../../../utils/errors';
import { BACKEND_URL } from '../../../utils/constants';

@Component({
  selector: 'app-create-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-employee-form.component.html',
  styleUrl: './create-employee-form.component.css',
})
export class CreateEmployeeFormComponent {
  @Input({ required: true }) formId = '';
  btnCloseModalId = '';
  sendingForm = false;

  newEmployeeForm = new FormGroup({
    name: new FormControl('', [
      stringValidator({ minLength: 3, maxLength: 32 }),
    ]),
    age: new FormControl(25, [numberValidator({ min: 16, max: 80 })]),
    role: new FormControl('admin', [
      stringValidator({
        minLength: 4,
        maxLength: 32,
        list: ['reparador', 'finanzas', 'admin', 'user'],
      }),
    ]),
    direction: new FormControl('', [
      stringValidator({ minLength: 6, maxLength: 100 }),
    ]),
    email: new FormControl('', [
      stringValidator({
        minLength: 8,
        maxLength: 54,
        regex: {
          value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          message: 'Ej. omar@gmail.com',
        },
      }),
    ]),
    phone: new FormControl('', [
      stringValidator({
        minLength: 4,
        maxLength: 32,
        regex: { value: /^\d{4}-\d{4}$/, message: 'Ej. 6589-4578' },
      }),
    ]),
  });

  constructor(private toast: HotToastService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formId']) {
      this.btnCloseModalId = `${this.formId}-close-btn`;
    }
  }

  showError = (field: string) => {
    return errorOf(field, this.newEmployeeForm);
  };

  onSubmit = async () => {
    this.sendingForm = true;
    try {
      await axios.post(`${BACKEND_URL}/employees`, this.newEmployeeForm.value);
      this.toast.success('Empleado añadido');
      clickCloseBtnModal(this.btnCloseModalId);
      this.newEmployeeForm.reset();
    } catch (e) {
      this.toast.error(getErrorMessage(e));
    }
    this.sendingForm = false;
  };
}
