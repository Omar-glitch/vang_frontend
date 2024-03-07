import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { errorOf, stringValidator } from '../../../utils/validators';
import { ClientModel, DEFAULT_CLIENT } from '../../../../models/ClientModel';
import deepEqual from 'deep-equal';
import { HotToastService } from '@ngneat/hot-toast';
import getErrorMessage from '../../../utils/errors';
import { clickCloseBtnModal } from '../../../utils/closeModal';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-update-client-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-client-form.component.html',
})
export class UpdateClientFormComponent {
  @Input({ required: true }) formId = '';
  @Input({ required: true }) formValues: ClientModel = DEFAULT_CLIENT;
  updateClientForm = new FormGroup({
    name: new FormControl(this.formValues.name, [
      stringValidator({ minLength: 3, maxLength: 12 }),
    ]),
    contact: new FormControl(this.formValues.contact, [
      stringValidator({ minLength: 4, maxLength: 32 }),
    ]),
  });
  @Input() onSuccessSubmit?: () => void;
  prevForm = this.updateClientForm.value;
  btnCloseModalId = '';
  sendingForm = false;

  constructor(
    private toast: HotToastService,
    private clientService: ClientService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formValues']) {
      const f = changes['formValues'].currentValue as ClientModel;
      this.updateClientForm.setValue({
        name: f.name,
        contact: f.contact,
      });
      this.prevForm = this.updateClientForm.value;
    }
    if (changes['formId']) {
      this.btnCloseModalId = `${this.formId}-close-btn`;
    }
  }

  showError = (field: string) => {
    return errorOf(field, this.updateClientForm);
  };

  onSubmit = async () => {
    if (deepEqual(this.updateClientForm.value, this.prevForm)) {
      this.toast.error('No hay nada que actualizar');
      return;
    }
    this.sendingForm = true;
    try {
      await this.clientService.putClient(
        this.formValues._id,
        this.updateClientForm.value
      );
      clickCloseBtnModal(this.btnCloseModalId);
      if (this.onSuccessSubmit) this.onSuccessSubmit();
      this.toast.success('Cliente actualizado');
    } catch (e) {
      this.toast.error(getErrorMessage(e));
    }
    this.sendingForm = false;
  };
}
