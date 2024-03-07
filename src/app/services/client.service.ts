import { Injectable } from '@angular/core';
import axios from 'axios';
import { BACKEND_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  url = `${BACKEND_URL}/clients/`;

  getClient = async (id: string) => {
    return axios.get(this.url + id);
  };

  getClients = async (filter?: any) => {
    return axios.get(this.url);
  };

  postClient = async (client: any) => {
    return axios.post(this.url, client);
  };

  putClient = async (id: string, client: any) => {
    return axios.put(this.url + id, client);
  };

  deleteClient = async (id: string) => {
    return axios.delete(this.url + id);
  };
}
