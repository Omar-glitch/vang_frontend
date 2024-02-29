import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import axios from 'axios';
import { ClientModel } from '../../../models/ClientModel';
import { refreshFlowbite } from '../../utils/flowbite';
import { CreateClientFormComponent } from '../../components/forms/create-client-form/create-client-form.component';
import { UpdateClientFormComponent } from '../../components/forms/update-client-form/update-client-form.component';
import { BACKEND_URL } from '../../utils/constants';
import { HotToastService } from '@ngneat/hot-toast';
import getErrorMessage from '../../utils/errors';
import copy from 'copy-to-clipboard';
import { LoadingTableComponent } from '../../components/tableStates/loading-table/loading-table.component';
import { EmptyTableComponent } from '../../components/tableStates/empty-table/empty-table.component';
import { ErrorTableComponent } from '../../components/tableStates/error-table/error-table.component';

@Component({
  selector: 'app-client-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CreateClientFormComponent,
    UpdateClientFormComponent,
    LoadingTableComponent,
    EmptyTableComponent,
    ErrorTableComponent,
  ],
  templateUrl: './client-page.component.html',
  styleUrl: './client-page.component.css',
})
export class ClientPageComponent {
  clients: ClientModel[] = [];
  clientUpdateFormValues: ClientModel = {
    _id: '',
    contact: '',
    name: '',
  };
  createClientFormId = 'createClientFormId';
  updateClientFormId = 'updateClientFormId';
  loading = true;
  error: undefined | string;

  constructor(private toast: HotToastService) {}

  copyText = (str: string) => {
    copy(str);
    this.toast.success('Copiado!');
  };

  refreshPage = () => {
    this.getClients();
  };

  getClients = async () => {
    try {
      this.error = undefined;
      const clients = await axios.get(`${BACKEND_URL}/clients`);
      this.clients = clients.data;
      this.loading = false;
      refreshFlowbite(250);
    } catch (e) {
      const errorMessage = getErrorMessage(e);
      this.error = errorMessage;
      this.toast.error(errorMessage);
    }
  };

  setEditClientValues = (client: ClientModel) => {
    this.clientUpdateFormValues = client;
  };

  deleteClient = async (id: string) => {
    const confirmed = confirm('¿Estas seguro de eliminar este cliente?');
    if (!confirmed) return;
    try {
      await axios.delete(`${BACKEND_URL}/clients/${id}`);
      this.toast.success('Cliente eliminado');
      this.refreshPage();
    } catch (e) {
      this.toast.error(getErrorMessage(e));
    }
  };

  ngOnInit() {
    this.getClients();
  }
}
