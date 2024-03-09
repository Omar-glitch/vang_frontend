import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClientModel, DEFAULT_CLIENT } from '../../../models/ClientModel';
import { refreshFlowbite } from '../../utils/flowbite';
import { CreateClientFormComponent } from '../../components/forms/create-client-form/create-client-form.component';
import { UpdateClientFormComponent } from '../../components/forms/update-client-form/update-client-form.component';
import { HotToastService } from '@ngneat/hot-toast';
import getErrorMessage from '../../utils/errors';
import copy from 'copy-to-clipboard';
import { LoadingTableComponent } from '../../components/tableStates/loading-table/loading-table.component';
import { EmptyTableComponent } from '../../components/tableStates/empty-table/empty-table.component';
import { ErrorTableComponent } from '../../components/tableStates/error-table/error-table.component';
import { objectIdToInputDate } from '../../utils/texts';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchInputComponent } from '../../components/inputs/search-input/search-input.component';
import { RemoveFilterButtonComponent } from '../../components/inputs/remove-filter-button/remove-filter-button.component';

@Component({
  selector: 'app-client-page',
  standalone: true,
  imports: [
    CreateClientFormComponent,
    UpdateClientFormComponent,
    LoadingTableComponent,
    EmptyTableComponent,
    ErrorTableComponent,
    SearchInputComponent,
    RemoveFilterButtonComponent,
  ],
  templateUrl: './client-page.component.html',
})
export class ClientPageComponent {
  clients: ClientModel[] = [];
  clientUpdateFormValues: ClientModel = DEFAULT_CLIENT;
  createClientFormId = 'createClientFormId';
  updateClientFormId = 'updateClientFormId';
  loading = true;
  error: undefined | string;
  currentFilter: Record<string, string> = {};

  constructor(
    private toast: HotToastService,
    private route: ActivatedRoute,
    private clientService: ClientService
  ) {}

  objectIdDate = objectIdToInputDate;

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
      const clients = await this.clientService.getClients(this.currentFilter);
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
      await this.clientService.deleteClient(id);
      this.toast.success('Cliente eliminado');
      this.refreshPage();
    } catch (e) {
      this.toast.error(getErrorMessage(e));
    }
  };

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.currentFilter = {};
      params.keys.map((k) => {
        this.currentFilter[k] = params.get(k) as string;
      });
      this.getClients();
    });
  }
}
