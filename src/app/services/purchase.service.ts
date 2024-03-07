import { Injectable } from '@angular/core';
import axios from 'axios';
import { BACKEND_URL } from '../utils/constants';
import { PurchaseModel } from '../../models/PurchaseModel';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  url = `${BACKEND_URL}/purchases/`;

  getPurchase = async (id: string) => {
    return axios.get(this.url + id);
  };

  getSumCost = (purchases: PurchaseModel[]) => {
    return purchases.reduce((prev, curr) => prev + curr.cost, 0);
  };

  getPurchases = async (filter?: any) => {
    return axios.get(this.url);
  };

  postPurchase = async (purchase: any) => {
    return axios.post(this.url, purchase);
  };

  putPurchase = async (id: string, purchase: any) => {
    return axios.put(this.url + id, purchase);
  };

  deletePurchase = async (id: string) => {
    return axios.delete(this.url + id);
  };
}
