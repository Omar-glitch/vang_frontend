import { Component, Input } from '@angular/core';
import { InventoryModel } from '../../../../models/InventoryModel';
import getErrorMessage from '../../../utils/errors';
import axios from 'axios';
import { BACKEND_URL } from '../../../utils/constants';
import { InventoryService } from '../../../services/inventory.service';

@Component({
  selector: 'app-inventory-modal',
  standalone: true,
  imports: [],
  templateUrl: './inventory-modal.component.html',
})
export class InventoryModalComponent {
  @Input({ required: true }) modalId!: string;
  @Input({ required: true }) onSelect!: (item: string) => void;
  inventories: InventoryModel[] = [];

  constructor(private inventoryService: InventoryService) {}

  getInventories = async () => {
    try {
      // this.error = undefined;
      const inventories = await this.inventoryService.getInventories();
      this.inventories = inventories.data;
      console.log(inventories.data);
      // this.loading = false;
    } catch (e) {
      const errorMessage = getErrorMessage(e);
      console.log(errorMessage);
      // this.error = errorMessage;
      // this.toast.error(errorMessage);
    }
  };

  ngOnInit() {
    this.getInventories();
  }
}
