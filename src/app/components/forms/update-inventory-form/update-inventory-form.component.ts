import { Component, Input, SimpleChanges } from '@angular/core';
import axios from 'axios';
import deepEqual from 'deep-equal';
import { clickCloseBtnModal } from '../../../utils/closeModal';
import getErrorMessage from '../../../utils/errors';
import { BACKEND_URL } from '../../../utils/constants';
import {
  errorOf,
  numberValidator,
  stringValidator,
} from '../../../utils/validators';
import { HotToastService } from '@ngneat/hot-toast';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  DEFAULT_INVENTORY,
  INVENTORY_TYPES,
  InventoryModel,
} from '../../../../models/InventoryModel';

@Component({
  selector: 'app-update-inventory-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-inventory-form.component.html',
  styleUrl: './update-inventory-form.component.css',
})
export class UpdateInventoryFormComponent {
  @Input({ required: true }) formId!: string;
  @Input() onSuccessSubmit?: () => void;
  @Input({ required: true }) formValues: InventoryModel = DEFAULT_INVENTORY;
  inventoryTypes = INVENTORY_TYPES;
  updateInventoryForm = new FormGroup({
    name: new FormControl(this.formValues.name, [
      stringValidator({ minLength: 3, maxLength: 32 }),
    ]),
    description: new FormControl(this.formValues.description, [
      stringValidator({ minLength: 8, maxLength: 54 }),
    ]),
    type: new FormControl(this.formValues.type, [
      stringValidator({
        minLength: 1,
        maxLength: 32,
        list: INVENTORY_TYPES,
      }),
    ]),
    stock: new FormControl(this.formValues.stock, [
      numberValidator({ min: 1, max: 2_500 }),
    ]),
    min: new FormControl(this.formValues.min, [
      numberValidator({ min: 0, max: 2_500 }),
    ]),
    cost: new FormControl(this.formValues.cost, [
      numberValidator({ min: 0, max: 120_000 }),
    ]),
  });
  prevForm = this.updateInventoryForm.value;
  btnCloseModalId = '';
  sendingForm = false;

  constructor(private toast: HotToastService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formValues']) {
      const f = changes['formValues'].currentValue as InventoryModel;
      this.updateInventoryForm.setValue({
        cost: f.cost,
        description: f.description,
        min: f.min,
        name: f.name,
        stock: f.stock,
        type: f.type,
      });
      this.prevForm = this.updateInventoryForm.value;
    }
    if (changes['formId']) {
      this.btnCloseModalId = `${this.formId}-close-btn`;
    }
  }

  showError = (field: string) => {
    return errorOf(field, this.updateInventoryForm);
  };

  onSubmit = async () => {
    if (deepEqual(this.updateInventoryForm.value, this.prevForm)) {
      this.toast.error('No hay nada que actualizar');
      return;
    }
    this.sendingForm = true;
    try {
      await axios.put(
        `${BACKEND_URL}/inventories/${this.formValues._id}`,
        this.updateInventoryForm.value
      );
      clickCloseBtnModal(this.btnCloseModalId);
      if (this.onSuccessSubmit) this.onSuccessSubmit();
      this.toast.success('Inventario actualizado');
    } catch (e) {
      this.toast.error(getErrorMessage(e));
    }
    this.sendingForm = false;
  };
}
