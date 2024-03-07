import { Component } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import copy from 'copy-to-clipboard';
import { DEFAULT_FLOWBITE_TIME, refreshFlowbite } from '../../utils/flowbite';
import getErrorMessage from '../../utils/errors';
import {
  DEFAULT_INVENTORY,
  InventoryModel,
} from '../../../models/InventoryModel';
import { RouterLink } from '@angular/router';
import { LoadingTableComponent } from '../../components/tableStates/loading-table/loading-table.component';
import { EmptyTableComponent } from '../../components/tableStates/empty-table/empty-table.component';
import { ErrorTableComponent } from '../../components/tableStates/error-table/error-table.component';
import { CreateInventoryFormComponent } from '../../components/forms/create-inventory-form/create-inventory-form.component';
import { UpdateInventoryFormComponent } from '../../components/forms/update-inventory-form/update-inventory-form.component';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-inventories-page',
  standalone: true,
  imports: [
    RouterLink,
    CreateInventoryFormComponent,
    UpdateInventoryFormComponent,
    LoadingTableComponent,
    EmptyTableComponent,
    ErrorTableComponent,
  ],
  templateUrl: './inventories-page.component.html',
})
export class InventoriesPageComponent {
  inventories: InventoryModel[] = [];
  inventoryUpdateFormValues: InventoryModel = DEFAULT_INVENTORY;
  createInventoryFormId = 'createInventoryFormId';
  updateInventoryFormId = 'updateInventoryFormId';
  loading = true;
  error: string | undefined;

  constructor(
    private toast: HotToastService,
    private inventoryService: InventoryService
  ) {}

  copyText = (str: string) => {
    copy(str);
    this.toast.success('Copiado!');
  };

  refreshPage = () => {
    this.getInventories();
  };

  getInventories = async () => {
    try {
      this.error = undefined;
      const inventories = await this.inventoryService.getInventories();
      this.inventories = inventories.data;
      this.loading = false;
      refreshFlowbite(DEFAULT_FLOWBITE_TIME);
    } catch (e) {
      const errorMessage = getErrorMessage(e);
      this.error = errorMessage;
      this.toast.error(errorMessage);
    }
  };

  setEditInventoryValues = (inventory: InventoryModel) => {
    this.inventoryUpdateFormValues = inventory;
  };

  deleteInventory = async (id: string) => {
    const confirmed = confirm('¿Estas seguro de eliminar este equipo?');
    if (!confirmed) return;
    try {
      await this.inventoryService.deleteInventory(id);
      this.toast.success('Equipo eliminado');
      this.refreshPage();
    } catch (e) {
      this.toast.error(getErrorMessage(e));
    }
  };

  ngOnInit() {
    this.getInventories();
  }
}
