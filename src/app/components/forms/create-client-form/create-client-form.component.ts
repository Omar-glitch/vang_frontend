import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { errorOf, stringValidator } from '../../../utils/validators';
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
  btnCloseModalId = '';
  sendingForm = false;

  newClientForm = new FormGroup({
    name: new FormControl('', [
      stringValidator({ minLength: 3, maxLength: 12 }),
    ]),
    contact: new FormControl('', [
      stringValidator({ minLength: 4, maxLength: 32 }),
    ]),
  });

  constructor(private toast: HotToastService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formId']) {
      this.btnCloseModalId = `${this.formId}-close-btn`;
    }
  }

  showError = (field: string) => {
    return errorOf(field, this.newClientForm);
  };

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
