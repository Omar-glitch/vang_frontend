import { Component } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import axios from 'axios';
import copy from 'copy-to-clipboard';
import { DEFAULT_FLOWBITE_TIME, refreshFlowbite } from '../../utils/flowbite';
import { BACKEND_URL } from '../../utils/constants';
import getErrorMessage from '../../utils/errors';
import { InventoryModel } from '../../../models/InventoryModel';
import { RouterLink } from '@angular/router';
import { LoadingTableComponent } from '../../components/tableStates/loading-table/loading-table.component';
import { EmptyTableComponent } from '../../components/tableStates/empty-table/empty-table.component';
import { ErrorTableComponent } from '../../components/tableStates/error-table/error-table.component';
import { CreateInventoryFormComponent } from '../../components/forms/create-inventory-form/create-inventory-form.component';
import { UpdateInventoryFormComponent } from '../../components/forms/update-inventory-form/update-inventory-form.component';

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
  styleUrl: './inventories-page.component.css',
})
export class InventoriesPageComponent {
  inventories: InventoryModel[] = [];
  inventoryUpdateFormValues: InventoryModel = {
    _id: '',
    description: '',
    min: 0,
    name: '',
    cost: 0,
    stock: 0,
    type: '',
  };
  createInventoryFormId = 'createInventoryFormId';
  updateInventoryFormId = 'updateInventoryFormId';
  loading = true;
  error: string | undefined;

  constructor(private toast: HotToastService) {}

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
      const inventories = await axios.get(`${BACKEND_URL}/inventories`);
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
      await axios.delete(`${BACKEND_URL}/inventories/${id}`);
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
