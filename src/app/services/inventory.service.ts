import { Injectable } from '@angular/core';
import axios from 'axios';
import { BACKEND_URL } from '../utils/constants';
import { getQueries } from '../utils/texts';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  url = `${BACKEND_URL}/inventories/`;

  getInventory = async (id: string) => {
    return axios.get(this.url + id);
  };

  getInventories = async (filter?: Record<string, string>) => {
    let q = getQueries(filter);
    return axios.get(this.url + q);
  };

  postInventory = async (inventory: any) => {
    return axios.post(this.url, inventory);
  };

  putInventory = async (id: string, inventory: any) => {
    return axios.put(this.url + id, inventory);
  };

  putAddInventory = async (id: string, inventory: any) => {
    return axios.put(`${this.url}add/${id}`, inventory);
  };

  deleteInventory = async (id: string) => {
    return axios.delete(this.url + id);
  };
}
