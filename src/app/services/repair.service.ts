import { Injectable } from '@angular/core';
import axios from 'axios';
import { BACKEND_URL } from '../utils/constants';
import { RepairModel } from '../../models/RepairModel';

@Injectable({
  providedIn: 'root',
})
export class RepairService {
  url = `${BACKEND_URL}/repairs/`;

  getSumPrice(repairs: RepairModel[]) {
    return repairs.reduce((prev, curr) => prev + curr.price, 0);
  }

  generateBill = async (id: string) => {
    return axios.put(`${this.url}bill/${id}`);
  };

  getRepair = async (id: string) => {
    return axios.get(this.url + id);
  };

  getRepairs = async (filter?: any) => {
    return axios.get(this.url);
  };

  postRepair = async (repair: any) => {
    return axios.post(this.url, repair);
  };

  putRepair = async (id: string, repair: any) => {
    return axios.put(this.url + id, repair);
  };

  deleteRepair = async (id: string) => {
    return axios.delete(this.url + id);
  };
}
