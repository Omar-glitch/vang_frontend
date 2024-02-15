import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { hasError, stringValidator } from '../../../utils/validators';
import axios from 'axios';
import { clickCloseBtnModal } from '../../../utils/closeModal';
import { HotToastService } from '@ngneat/hot-toast';
import getErrorMessage from '../../../utils/errors';

@Component({
  selector: 'app-create-client-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-client-form.component.html',
  styleUrl: './create-client-form.component.css',
})
export class CreateClientFormComponent {
  @Input({ required: true }) formId = '';
  btnCloseModalId = `${this.formId}-close-btn2`;
  sendingForm = false;

  constructor(private toast: HotToastService) {}

  newClientForm = new FormGroup({
    name: new FormControl('', [
      stringValidator({ minLength: 3, maxLength: 12 }),
    ]),
    contact: new FormControl('', [
      stringValidator({ minLength: 4, maxLength: 32 }),
    ]),
  });

  // fieldError = (field: string) => {
  //   return hasError(field, this.newClientForm);
  // };

  // hasError = (field: string) => {
  //   const fieldValue = this.newClientForm.get(field);
  //   if (!fieldValue) return '';
  //   if (fieldValue.errors)
  //     return fieldValue.errors['stringValidator'].message as string;
  //   return '';
  // };

  // showErrors = () => {
  //   const field = this.newClientForm.get('name');
  //   console.log(field?.errors);
  //   console.log(this.newClientForm.errors);

  // };

  onSubmit = async () => {
    this.sendingForm = true;
    try {
      await axios.post(
        'http://localhost:3000/clients',
        this.newClientForm.value
      );
      this.toast.success('Cliente añadido');
      clickCloseBtnModal(this.btnCloseModalId);
      this.newClientForm.reset();
    } catch (e) {
      this.toast.error(getErrorMessage(e));
    }
    this.sendingForm = false;
  };
}
