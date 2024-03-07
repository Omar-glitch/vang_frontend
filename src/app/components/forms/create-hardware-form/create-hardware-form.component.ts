import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  errorOf,
  numberValidator,
  stringValidator,
} from '../../../utils/validators';
import { HotToastService } from '@ngneat/hot-toast';
import axios from 'axios';
import { BACKEND_URL } from '../../../utils/constants';
import { clickCloseBtnModal } from '../../../utils/closeModal';
import getErrorMessage from '../../../utils/errors';
import { HARDWARE_PRIORITIES } from '../../../../models/HardwareModel';

@Component({
  selector: 'app-create-hardware-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-hardware-form.component.html',
})
export class CreateHardwareFormComponent {
  @Input({ required: true }) formId = '';
  btnCloseModalId = '';
  sendingForm = false;
  hardwarePriorities = HARDWARE_PRIORITIES;
  @Input() onSuccessSubmit?: () => void;

  newHardwareForm = new FormGroup({
    name: new FormControl('', [
      stringValidator({ minLength: 2, maxLength: 32 }),
    ]),
    description: new FormControl('', [
      stringValidator({ minLength: 8, maxLength: 54 }),
    ]),
    cost: new FormControl(0, [numberValidator({ min: 20, max: 120_000 })]),
    stock: new FormControl(0, [numberValidator({ min: 1, max: 2500 })]),
    priority: new FormControl(HARDWARE_PRIORITIES[0], [
      stringValidator({
        minLength: 2,
        maxLength: 60,
        list: HARDWARE_PRIORITIES,
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
    return errorOf(field, this.newHardwareForm);
  };

  onSubmit = async () => {
    this.sendingForm = true;
    try {
      await axios.post(`${BACKEND_URL}/hardwares`, this.newHardwareForm.value);
      this.toast.success('Equipo añadido');
      clickCloseBtnModal(this.btnCloseModalId);
      this.newHardwareForm.reset();
      if (this.onSuccessSubmit) this.onSuccessSubmit();
    } catch (e) {
      this.toast.error(getErrorMessage(e));
    }
    this.sendingForm = false;
  };
}
