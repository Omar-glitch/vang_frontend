import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DEFAULT_EMPLOYEE, EmployeeModel } from '../../../models/EmployeeModel';
import getErrorMessage from '../../utils/errors';
import { refreshFlowbite } from '../../utils/flowbite';
import copy from 'copy-to-clipboard';
import { HotToastService } from '@ngneat/hot-toast';
import { CreateEmployeeFormComponent } from '../../components/forms/create-employee-form/create-employee-form.component';
import { UpdateEmployeeFormComponent } from '../../components/forms/update-employee-form/update-employee-form.component';
import { LoadingTableComponent } from '../../components/tableStates/loading-table/loading-table.component';
import { EmptyTableComponent } from '../../components/tableStates/empty-table/empty-table.component';
import { ErrorTableComponent } from '../../components/tableStates/error-table/error-table.component';
import { objectIdToInputDate } from '../../utils/texts';
import { EmployeeService } from '../../services/employee.service';
import { SearchInputComponent } from '../../components/inputs/search-input/search-input.component';
import { RemoveFilterButtonComponent } from '../../components/inputs/remove-filter-button/remove-filter-button.component';

@Component({
  selector: 'app-employees-page',
  standalone: true,
  imports: [
    RouterLink,
    CreateEmployeeFormComponent,
    UpdateEmployeeFormComponent,
    LoadingTableComponent,
    EmptyTableComponent,
    ErrorTableComponent,
    SearchInputComponent,
    RemoveFilterButtonComponent,
  ],
  templateUrl: './employees-page.component.html',
})
export class EmployeesPageComponent {
  employees: EmployeeModel[] = [];
  employeeUpdateFormValues: EmployeeModel = DEFAULT_EMPLOYEE;
  createEmployeeFormId = 'createEmployeeFormId';
  updateEmployeeFormId = 'updateEmployeeFormId';
  loading = true;
  error: string | undefined;
  currentFilter: Record<string, string> = {};

  constructor(
    private toast: HotToastService,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  objectIdDate = objectIdToInputDate;

  copyText = (str: string) => {
    copy(str);
    this.toast.success('Copiado!');
  };

  refreshPage = () => {
    this.getEmployees();
  };

  getEmployees = async () => {
    try {
      this.error = undefined;
      const employees = await this.employeeService.getEmployees(
        this.currentFilter
      );
      this.employees = employees.data;
      this.loading = false;
      refreshFlowbite(250);
    } catch (e) {
      const errorMessage = getErrorMessage(e);
      this.error = errorMessage;
      this.toast.error(errorMessage);
    }
  };

  setEditEmployeeValues = (employee: EmployeeModel) => {
    this.employeeUpdateFormValues = employee;
  };

  deleteEmployee = async (id: string) => {
    const confirmed = confirm('¿Estas seguro de eliminar este empleado?');
    if (!confirmed) return;
    try {
      await this.employeeService.deleteEmployee(id);
      this.toast.success('Empleado eliminado');
      this.refreshPage();
    } catch (e) {
      this.toast.error(getErrorMessage(e));
    }
  };

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.currentFilter = {};
      params.keys.map((k) => {
        this.currentFilter[k] = params.get(k) as string;
      });
      this.getEmployees();
    });
  }
}
