import { Injectable } from '@angular/core';
import axios from 'axios';
import { BACKEND_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class HardwareService {
  url = `${BACKEND_URL}/hardwares/`;

  getHardware = async (id: string) => {
    return axios.get(this.url + id);
  };

  getHardwares = async (filter?: any) => {
    return axios.get(this.url);
  };

  postHardware = async (hardware: any) => {
    return axios.post(this.url, hardware);
  };

  putHardware = async (id: string, hardware: any) => {
    return axios.put(this.url + id, hardware);
  };

  deleteHardware = async (id: string) => {
    return axios.delete(this.url + id);
  };
}
