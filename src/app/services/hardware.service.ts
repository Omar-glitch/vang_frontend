import { Injectable } from '@angular/core';
import axios from 'axios';
import { BACKEND_URL } from '../utils/constants';
import { getQueries } from '../utils/texts';

@Injectable({
  providedIn: 'root',
})
export class HardwareService {
  url = `${BACKEND_URL}/hardwares/`;

  getHardware = async (id: string) => {
    return axios.get(this.url + id);
  };

  getHardwares = async (filter?: Record<string, string>) => {
    let q = getQueries(filter);
    return axios.get(this.url + q);
  };

  postHardware = async (hardware: any) => {
    return axios.post(this.url, hardware);
  };

  putHardware = async (id: string, hardware: any) => {
    return axios.put(this.url + id, hardware);
  };

  putAddHardware = async (id: string, inventory: any) => {
    return axios.put(`${this.url}add/${id}`, inventory);
  };

  deleteHardware = async (id: string) => {
    return axios.delete(this.url + id);
  };
}
