import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  errorOf,
  numberValidator,
  stringValidator,
} from '../../../utils/validators';
import { HotToastService } from '@ngneat/hot-toast';
import { clickCloseBtnModal } from '../../../utils/closeModal';
import getErrorMessage from '../../../utils/errors';
import { INVENTORY_TYPES } from '../../../../models/InventoryModel';
import { InventoryService } from '../../../services/inventory.service';

@Component({
  selector: 'app-create-inventory-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-inventory-form.component.html',
})
export class CreateInventoryFormComponent {
  @Input({ required: true }) formId!: string;
  @Input() onSuccessSubmit?: () => void;
  btnCloseModalId = '';
  sendingForm = false;
  inventoryTypes = INVENTORY_TYPES;

  newInventoryForm = new FormGroup({
    name: new FormControl('', [
      stringValidator({ minLength: 3, maxLength: 32 }),
    ]),
    description: new FormControl('', [
      stringValidator({ minLength: 8, maxLength: 54 }),
    ]),
    type: new FormControl(INVENTORY_TYPES[0], [
      stringValidator({
        minLength: 1,
        maxLength: 32,
        list: INVENTORY_TYPES,
      }),
    ]),
    stock: new FormControl(0, [numberValidator({ min: 1, max: 80 })]),
    cost: new FormControl(0, [numberValidator({ min: 20, max: 120_000 })]),
    min: new FormControl(0, [numberValidator({ min: 0, max: 2500 })]),
  });

  constructor(
    private toast: HotToastService,
    private inventoryService: InventoryService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formId']) {
      this.btnCloseModalId = `${this.formId}-close-btn`;
    }
  }

  showError = (field: string) => {
    return errorOf(field, this.newInventoryForm);
  };

  onSubmit = async () => {
    this.sendingForm = true;
    try {
      await this.inventoryService.postInventory(this.newInventoryForm.value);
      this.toast.success('Inventario añadido');
      clickCloseBtnModal(this.btnCloseModalId);
      this.newInventoryForm.reset();
      if (this.onSuccessSubmit) this.onSuccessSubmit();
    } catch (e) {
      this.toast.error(getErrorMessage(e));
    }
    this.sendingForm = false;
  };
}
