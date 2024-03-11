import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import deepEqual from 'deep-equal';
import {
  errorOf,
  numberValidator,
  stringValidator,
} from '../../../utils/validators';
import { clickCloseBtnModal } from '../../../utils/closeModal';
import getErrorMessage from '../../../utils/errors';
import { HotToastService } from '@ngneat/hot-toast';
import {
  DEFAULT_REPAIR,
  REPAIR_STATUS,
  REPAIR_TYPES,
  RepairModel,
} from '../../../../models/RepairModel';
import { RepairService } from '../../../services/repair.service';
import { InventoryModel } from '../../../../models/InventoryModel';
import { EmployeeModel } from '../../../../models/EmployeeModel';
import { ClientModel } from '../../../../models/ClientModel';
import { InventoryService } from '../../../services/inventory.service';
import { ClientService } from '../../../services/client.service';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-update-repair-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-repair-form.component.html',
})
export class UpdateRepairFormComponent {
  @Input({ required: true }) formId!: string;
  @Input() onSuccessSubmit?: () => void;
  @Input({ required: true }) formValues: RepairModel = DEFAULT_REPAIR;
  repairTypes = REPAIR_TYPES;
  repairStatus = REPAIR_STATUS;
  inventories: InventoryModel[] = [];
  employees: EmployeeModel[] = [];
  clients: ClientModel[] = [];

  updateRepairForm = new FormGroup({
    price: new FormControl(0, [numberValidator({ min: 50, max: 200_000 })]),
    description: new FormControl('', [
      stringValidator({ minLength: 8, maxLength: 120 }),
    ]),
    status: new FormControl('', [
      stringValidator({
        minLength: 1,
        maxLength: 32,
        list: REPAIR_STATUS,
      }),
    ]),
    type: new FormControl('', [
      stringValidator({
        minLength: 1,
        maxLength: 32,
        list: REPAIR_TYPES,
      }),
    ]),
    inventory_amount: new FormControl(0, [numberValidator({ min: 1, max: 8 })]),
    inventory: new FormControl('', [
      stringValidator({ minLength: 3, maxLength: 32 }),
    ]),
    employee: new FormControl('', [
      stringValidator({ minLength: 3, maxLength: 32 }),
    ]),
    client: new FormControl('', [
      stringValidator({ minLength: 3, maxLength: 32 }),
    ]),
  });
  prevForm = this.updateRepairForm.value;
  btnCloseModalId = '';
  sendingForm = false;

  constructor(
    private toast: HotToastService,
    private repairService: RepairService,
    private inventoryService: InventoryService,
    private clientService: ClientService,
    private employeeService: EmployeeService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formValues']) {
      const f = changes['formValues'].currentValue as RepairModel;
      this.updateRepairForm.setValue({
        description: f.description,
        client: f.client,
        employee: f.employee,
        inventory: f.inventory,
        inventory_amount: f.inventory_amount,
        price: f.price,
        status: f.status,
        type: f.type,
      });
      this.prevForm = this.updateRepairForm.value;
    }
    if (changes['formId']) {
      this.btnCloseModalId = `${this.formId}-close-btn`;
    }
  }

  showError = (field: string) => {
    return errorOf(field, this.updateRepairForm);
  };

  onSubmit = async () => {
    if (deepEqual(this.updateRepairForm.value, this.prevForm)) {
      this.toast.error('No hay nada que actualizar');
      return;
    }
    this.sendingForm = true;
    try {
      await this.repairService.putRepair(
        this.formValues._id,
        this.updateRepairForm.value
      );
      clickCloseBtnModal(this.btnCloseModalId);
      if (this.onSuccessSubmit) this.onSuccessSubmit();
      this.toast.success('Reparación actualizada');
    } catch (e) {
      this.toast.error(getErrorMessage(e));
    }
    this.sendingForm = false;
  };

  ngOnInit() {
    this.inventoryService.getInventories().then((res) => {
      this.inventories = res.data;
    });
    this.clientService.getClients().then((res) => {
      this.clients = res.data;
    });
    this.employeeService.getEmployees({ role: 'reparador' }).then((res) => {
      this.employees = res.data;
    });
  }
}
