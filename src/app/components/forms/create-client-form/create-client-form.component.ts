import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { errorOf, stringValidator } from '../../../utils/validators';
import { clickCloseBtnModal } from '../../../utils/closeModal';
import { HotToastService } from '@ngneat/hot-toast';
import getErrorMessage from '../../../utils/errors';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-create-client-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-client-form.component.html',
})
export class CreateClientFormComponent {
  @Input({ required: true }) formId = '';
  @Input() onSuccessSubmit?: () => void;
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

  constructor(
    private toast: HotToastService,
    private clientService: ClientService
  ) {}

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
      await this.clientService.postClient(this.newClientForm.value);
      this.toast.success('Cliente añadido');
      clickCloseBtnModal(this.btnCloseModalId);
      this.newClientForm.reset();
      if (this.onSuccessSubmit) this.onSuccessSubmit();
    } catch (e) {
      this.toast.error(getErrorMessage(e));
    }
    this.sendingForm = false;
  };
}
