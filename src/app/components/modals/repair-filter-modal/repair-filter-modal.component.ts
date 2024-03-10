import { Component, Input, SimpleChanges } from '@angular/core';
import { clickCloseBtnModal } from '../../../utils/closeModal';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { REPAIR_STATUS, REPAIR_TYPES } from '../../../../models/RepairModel';
import { InventoryModel } from '../../../../models/InventoryModel';
import { EmployeeModel } from '../../../../models/EmployeeModel';
import { ClientModel } from '../../../../models/ClientModel';
import { InventoryService } from '../../../services/inventory.service';
import { ClientService } from '../../../services/client.service';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-repair-filter-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './repair-filter-modal.component.html',
})
export class RepairFilterModalComponent {
  @Input({ required: true }) formId!: string;
  btnCloseModalId = '';
  repairTypes = REPAIR_TYPES;
  repairStatus = REPAIR_STATUS;
  inventories: InventoryModel[] = [];
  employees: EmployeeModel[] = [];
  clients: ClientModel[] = [];

  repairFilterForm = new FormGroup({
    minDate: new FormControl(''),
    maxDate: new FormControl(''),
    minPrice: new FormControl(0),
    maxPrice: new FormControl(0),
    inventory: new FormControl(''),
    client: new FormControl(''),
    employee: new FormControl(''),
    type: new FormControl(''),
    status: new FormControl(''),
    order: new FormControl(''),
  });

  constructor(
    private router: Router,
    private inventoryService: InventoryService,
    private clientService: ClientService,
    private employeeService: EmployeeService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formId']) {
      this.btnCloseModalId = `${this.formId}-close-btn`;
    }
  }

  onSubmit() {
    let validFilter: Record<string, string> = {};
    let f = this.repairFilterForm.value as Record<string, string>;

    for (const key in f) {
      if (Boolean(f[key])) {
        validFilter[key] = f[key];
      }
    }

    this.router.navigate(['/dashboard/repairs'], {
      queryParams: validFilter,
    });
    clickCloseBtnModal(this.btnCloseModalId);
  }

  refreshFilter() {
    this.repairFilterForm.reset();
  }

  ngOnInit() {
    this.inventoryService.getInventories().then((res) => {
      this.inventories = res.data;
    });
    this.clientService.getClients().then((res) => {
      this.clients = res.data;
    });
    this.employeeService.getEmployees().then((res) => {
      this.employees = res.data;
    });
  }
}
