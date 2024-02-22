import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmployeeModel } from '../../../models/EmployeeModel';
import axios from 'axios';
import { BACKEND_URL } from '../../utils/constants';
import getErrorMessage from '../../utils/errors';
import { refreshFlowbite } from '../../utils/flowbite';
import copy from 'copy-to-clipboard';
import { HotToastService } from '@ngneat/hot-toast';
import { CreateEmployeeFormComponent } from '../../components/forms/create-employee-form/create-employee-form.component';
import { UpdateEmployeeFormComponent } from '../../components/forms/update-employee-form/update-employee-form.component';

@Component({
  selector: 'app-employees-page',
  standalone: true,
  imports: [
    RouterLink,
    CreateEmployeeFormComponent,
    UpdateEmployeeFormComponent,
  ],
  templateUrl: './employees-page.component.html',
  styleUrl: './employees-page.component.css',
})
export class EmployeesPageComponent {
  employees: EmployeeModel[] = [];
  employeeUpdateFormValues: EmployeeModel = {
    _id: '',
    name: '',
    age: 20,
    direction: '',
    email: '',
    phone: '',
    role: '',
  };
  createEmployeeFormId = 'createEmployeeFormId';
  updateEmployeeFormId = 'updateEmployeeFormId';
  loading = true;

  constructor(private toast: HotToastService) {}

  copyText = (str: string) => {
    copy(str);
    this.toast.success('Copiado!');
  };

  refreshPage = () => {
    this.getEmployees();
  };

  getEmployees = async () => {
    try {
      const employees = await axios.get(`${BACKEND_URL}/employees`);
      this.employees = employees.data;
      this.loading = false;
      refreshFlowbite(250);
    } catch (e) {
      this.toast.error(getErrorMessage(e));
    }
  };

  setEditEmployeeValues = (employee: EmployeeModel) => {
    this.employeeUpdateFormValues = employee;
  };

  deleteEmployee = async (id: string) => {
    const confirmed = confirm('¿Estas seguro de eliminar este empleado?');
    if (!confirmed) return;
    try {
      await axios.delete(`${BACKEND_URL}/employees/${id}`);
      this.toast.success('Empleado eliminado');
    } catch (e) {
      this.toast.error(getErrorMessage(e));
    }
  };

  ngOnInit() {
    this.getEmployees();
  }
}
