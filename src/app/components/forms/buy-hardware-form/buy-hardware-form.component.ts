import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { errorOf, numberValidator } from '../../../utils/validators';
import { HotToastService } from '@ngneat/hot-toast';
import { HardwareService } from '../../../services/hardware.service';
import deepEqual from 'deep-equal';
import { clickCloseBtnModal } from '../../../utils/closeModal';
import getErrorMessage from '../../../utils/errors';

@Component({
  selector: 'app-buy-hardware-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './buy-hardware-form.component.html',
})
export class BuyHardwareFormComponent {
  @Input({ required: true }) formId!: string;
  @Input() onSuccessSubmit?: () => void;
  @Input({ required: true }) hardwareId = '';
  @Input({ required: true }) hardwareName = '';
  updateHardwareForm = new FormGroup({
    toAdd: new FormControl(0, [numberValidator({ min: 1, max: 80 })]),
  });
  prevForm = this.updateHardwareForm.value;
  btnCloseModalId = '';
  sendingForm = false;

  constructor(
    private toast: HotToastService,
    private hardwareService: HardwareService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
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
      await this.hardwareService.putAddHardware(
        this.hardwareId,
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
