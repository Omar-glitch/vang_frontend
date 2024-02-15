import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import axios from 'axios';
import { ClientModel } from '../../../models/ClientModel';
import { refreshFlowbite } from '../../utils/flowbite';
import { CreateClientFormComponent } from '../../components/forms/create-client-form/create-client-form.component';
import { UpdateClientFormComponent } from '../../components/forms/update-client-form/update-client-form.component';
import { BACKEND_URL } from '../../utils/constants';
import { NgOptimizedImage } from '@angular/common';
import { HotToastService } from '@ngneat/hot-toast';
import getErrorMessage from '../../utils/errors';

@Component({
  selector: 'app-client-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CreateClientFormComponent,
    UpdateClientFormComponent,
    NgOptimizedImage,
  ],
  templateUrl: './client-page.component.html',
  styleUrl: './client-page.component.css',
})
export class ClientPageComponent {
  clients: ClientModel[] = [];
  clientUpdateFormValues: ClientModel = {
    _id: '',
    name: '',
    contact: '',
  };
  createClientFormId = 'createClientFormId';
  updateClientFormId = 'updateClientFormId';
  loading = true;

  constructor(private toast: HotToastService) {}

  refreshPage = () => {
    this.getClients();
  };

  getClients = async () => {
    try {
      const clients = await axios.get(`${BACKEND_URL}/clients`);
      this.clients = clients.data;
      this.loading = false;
      refreshFlowbite(250);
    } catch (e) {
      console.log(e);
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
    } catch (e) {
      this.toast.error(getErrorMessage(e));
    }
  };

  ngOnInit() {
    this.getClients();
  }
}
