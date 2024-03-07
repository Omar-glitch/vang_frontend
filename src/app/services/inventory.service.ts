import { Injectable } from '@angular/core';
import axios from 'axios';
import { BACKEND_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  url = `${BACKEND_URL}/inventories/`;

  getInventory = async (id: string) => {
    return axios.get(this.url + id);
  };

  getInventories = async (filter?: any) => {
    return axios.get(this.url);
  };

  postInventory = async (inventory: any) => {
    return axios.post(this.url, inventory);
  };

  putInventory = async (id: string, inventory: any) => {
    return axios.put(this.url + id, inventory);
  };

  deleteInventory = async (id: string) => {
    return axios.delete(this.url + id);
  };
}
