import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import axios from 'axios';
import { ClientModel } from '../../../models/ClientModel';
import { refreshFlowbite } from '../../utils/flowbite';
import { CreateClientFormComponent } from '../../components/forms/create-client-form/create-client-form.component';
import { UpdateClientFormComponent } from '../../components/forms/update-client-form/update-client-form.component';
import { stringValidator } from '../../utils/validators';

@Component({
  selector: 'app-client-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CreateClientFormComponent,
    UpdateClientFormComponent,
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

  getClients = async () => {
    try {
      const clients = await axios.get('http://localhost:3000/clients');
      this.clients = clients.data;
      this.loading = false;
      refreshFlowbite(1000);
    } catch (e) {
      console.log(e);
    }
  };

  setEditClientValues = (client: ClientModel) => {
    console.log(client);
    this.updateClientForm.setValue({
      name: client.name,
      contact: client.contact,
    });
  };

  deleteClient = async (id: string) => {
    const confirmed = confirm('¿Estas seguro de eliminar este cliente?');
    if (!confirmed) return;
    try {
      const deletedClient = await axios.delete(
        `http://localhost:3000/clients/${id}`
      );
      console.log(deletedClient);
    } catch (e) {
      console.log(e);
    }
  };

  updateClientForm = new FormGroup({
    name: new FormControl(this.clientUpdateFormValues.name, [
      stringValidator({ minLength: 3, maxLength: 12 }),
    ]),
    contact: new FormControl(this.clientUpdateFormValues.contact, [
      stringValidator({ minLength: 4, maxLength: 32 }),
    ]),
  });

  onSubmit = async () => {
    console.log('editting');
    try {
      const putClient = await axios.put(
        `http://localhost:3000/clients/${this.clientUpdateFormValues._id}`,
        this.updateClientForm.value
      );
      console.log(putClient.data);
    } catch (e) {
      console.log(e);
    }
  };

  ngOnInit() {
    this.getClients();
  }
}
