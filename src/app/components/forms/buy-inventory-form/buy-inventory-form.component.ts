import { Component, Input, SimpleChanges } from '@angular/core';
import { clickCloseBtnModal } from '../../../utils/closeModal';
import getErrorMessage from '../../../utils/errors';
import deepEqual from 'deep-equal';
import { errorOf, numberValidator } from '../../../utils/validators';
import { InventoryService } from '../../../services/inventory.service';
import { HotToastService } from '@ngneat/hot-toast';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-buy-inventory-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './buy-inventory-form.component.html',
})
export class BuyInventoryFormComponent {
  @Input({ required: true }) formId!: string;
  @Input() onSuccessSubmit?: () => void;
  @Input({ required: true }) inventoryId = '';
  @Input({ required: true }) inventoryName = '';
  updateInventoryForm = new FormGroup({
    toAdd: new FormControl(0, [numberValidator({ min: 1, max: 80 })]),
  });
  prevForm = this.updateInventoryForm.value;
  btnCloseModalId = '';
  sendingForm = false;

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
    return errorOf(field, this.updateInventoryForm);
  };

  onSubmit = async () => {
    if (deepEqual(this.updateInventoryForm.value, this.prevForm)) {
      this.toast.error('No hay nada que actualizar');
      return;
    }
    this.sendingForm = true;
    try {
      await this.inventoryService.putAddInventory(
        this.inventoryId,
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
