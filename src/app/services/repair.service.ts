import { Injectable } from '@angular/core';
import axios from 'axios';
import { BACKEND_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class RepairService {
  url = `${BACKEND_URL}/repairs/`;

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
