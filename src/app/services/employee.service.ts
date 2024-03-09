import { Injectable } from '@angular/core';
import axios from 'axios';
import { BACKEND_URL } from '../utils/constants';
import { getQueries } from '../utils/texts';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  url = `${BACKEND_URL}/employees/`;

  getEmployee = async (id: string) => {
    return axios.get(this.url + id);
  };

  getEmployees = async (filter?: Record<string, string>) => {
    let q = getQueries(filter);
    return axios.get(this.url + q);
  };

  postEmployee = async (employee: any) => {
    return axios.post(this.url, employee);
  };

  putEmployee = async (id: string, employee: any) => {
    return axios.put(this.url + id, employee);
  };

  deleteEmployee = async (id: string) => {
    return axios.delete(this.url + id);
  };
}
