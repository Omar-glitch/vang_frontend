import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { BillService } from '../../../services/bill.service';
import { BillModel, DEFAULT_BILL } from '../../../../models/BillModel';
import { errorOf } from '../../../utils/validators';
import deepEqual from 'deep-equal';
import { clickCloseBtnModal } from '../../../utils/closeModal';
import getErrorMessage from '../../../utils/errors';

@Component({
  selector: 'app-update-bill-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-bill-form.component.html',
})
export class UpdateBillFormComponent {
  @Input({ required: true }) formId = '';
  @Input({ required: true }) formValues: BillModel = DEFAULT_BILL;
  @Input() onSuccessSubmit?: () => void;
  updateBillForm = new FormGroup({
    paid: new FormControl(this.formValues.paid),
  });
  prevForm = this.updateBillForm.value;
  btnCloseModalId = '';
  sendingForm = false;

  constructor(
    private toast: HotToastService,
    private billService: BillService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formValues']) {
      const f = changes['formValues'].currentValue as BillModel;
      this.updateBillForm.setValue({
        paid: f.paid,
      });
      this.prevForm = this.updateBillForm.value;
    }
    if (changes['formId']) {
      this.btnCloseModalId = `${this.formId}-close-btn`;
    }
  }

  showError = (field: string) => {
    return errorOf(field, this.updateBillForm);
  };

  onSubmit = async () => {
    if (deepEqual(this.updateBillForm.value, this.prevForm)) {
      this.toast.error('No hay nada que actualizar');
      return;
    }
    this.sendingForm = true;
    try {
      await this.billService.putBill(
        this.formValues._id,
        this.updateBillForm.value
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
