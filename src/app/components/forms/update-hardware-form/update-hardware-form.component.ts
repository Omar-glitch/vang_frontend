import { Component, Input, SimpleChanges } from '@angular/core';
import getErrorMessage from '../../../utils/errors';
import deepEqual from 'deep-equal';
import {
  errorOf,
  numberValidator,
  stringValidator,
} from '../../../utils/validators';
import { clickCloseBtnModal } from '../../../utils/closeModal';
import {
  DEFAULT_HARDWARE,
  HARDWARE_PRIORITIES,
  HardwareModel,
} from '../../../../models/HardwareModel';
import { HotToastService } from '@ngneat/hot-toast';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HardwareService } from '../../../services/hardware.service';

@Component({
  selector: 'app-update-hardware-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-hardware-form.component.html',
})
export class UpdateHardwareFormComponent {
  @Input({ required: true }) formId = '';
  @Input({ required: true }) formValues: HardwareModel = DEFAULT_HARDWARE;
  @Input() onSuccessSubmit?: () => void;
  hardwarePriorities = HARDWARE_PRIORITIES;
  updateHardwareForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [stringValidator({ minLength: 2, maxLength: 32 })],
    }),
    description: new FormControl('', [
      stringValidator({ minLength: 8, maxLength: 54 }),
    ]),
    cost: new FormControl(0, [numberValidator({ min: 20, max: 120_000 })]),
    stock: new FormControl(0, [numberValidator({ min: 2, max: 2500 })]),
    priority: new FormControl('poco', [
      stringValidator({
        minLength: 2,
        maxLength: 60,
        list: HARDWARE_PRIORITIES,
      }),
    ]),
  });
  prevForm = this.updateHardwareForm.value;
  btnCloseModalId = '';
  sendingForm = false;

  constructor(
    private toast: HotToastService,
    private hardwareService: HardwareService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formValues']) {
      const f = changes['formValues'].currentValue as HardwareModel;
      this.updateHardwareForm.setValue({
        cost: f.cost,
        description: f.description,
        name: f.name,
        priority: f.priority,
        stock: f.stock,
      });
      this.prevForm = this.updateHardwareForm.value;
    }
    if (changes['formId']) {
      this.btnCloseModalId = `${this.formId}-close-btn`;
    }
  }

  showError = (field: string) => {
    return errorOf(field, this.updateHardwareForm);
  };

  onSubmit = async () => {
    if (deepEqual(this.updateHardwareForm.value, this.prevForm)) {
      this.toast.error('No hay nada que actualizar');
      return;
    }
    this.sendingForm = true;
    try {
      await this.hardwareService.putHardware(
        this.formValues._id,
        this.updateHardwareForm.value
      );
      clickCloseBtnModal(this.btnCloseModalId);
      if (this.onSuccessSubmit) this.onSuccessSubmit();
      this.toast.success('Equipo actualizado');
    } catch (e) {
      this.toast.error(getErrorMessage(e));
    }
    this.sendingForm = false;
  };
}
