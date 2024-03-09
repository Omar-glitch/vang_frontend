import { Injectable } from '@angular/core';
import axios from 'axios';
import { BACKEND_URL } from '../utils/constants';
import { BillModel } from '../../models/BillModel';
import { getQueries } from '../utils/texts';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  url = `${BACKEND_URL}/bills/`;

  getBill = async (id: string) => {
    return axios.get(this.url + id);
  };

  getSumPrice = (bills: BillModel[]) => {
    return bills.reduce((prev, curr) => prev + curr.amount, 0);
  };

  getBills = async (filter?: Record<string, string>) => {
    let q = getQueries(filter);
    return axios.get(this.url + q);
  };

  putBill = async (id: string, bill: any) => {
    return axios.put(this.url + id, bill);
  };

  deleteBill = async (id: string) => {
    return axios.delete(this.url + id);
  };
}
