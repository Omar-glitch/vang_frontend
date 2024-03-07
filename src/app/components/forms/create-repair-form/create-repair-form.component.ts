import { Component, Input, SimpleChanges } from '@angular/core';
import { REPAIR_STATUS, REPAIR_TYPES } from '../../../../models/RepairModel';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  errorOf,
  numberValidator,
  stringValidator,
} from '../../../utils/validators';
import { HotToastService } from '@ngneat/hot-toast';
import { clickCloseBtnModal } from '../../../utils/closeModal';
import getErrorMessage from '../../../utils/errors';
import { InventoryService } from '../../../services/inventory.service';
import { InventoryModel } from '../../../../models/InventoryModel';
import { EmployeeModel } from '../../../../models/EmployeeModel';
import { ClientModel } from '../../../../models/ClientModel';
import { RepairService } from '../../../services/repair.service';
import { EmployeeService } from '../../../services/employee.service';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-create-repair-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-repair-form.component.html',
})
export class CreateRepairFormComponent {
  @Input({ required: true }) formId!: string;
  @Input() onSuccessSubmit?: () => void;
  btnCloseModalId = '';
  sendingForm = false;
  repairTypes = REPAIR_TYPES;
  repairStatus = REPAIR_STATUS;

  inventories: InventoryModel[] = [];
  employees: EmployeeModel[] = [];
  clients: ClientModel[] = [];

  newRepairForm = new FormGroup({
    price: new FormControl(0, [numberValidator({ min: 50, max: 200_000 })]),
    description: new FormControl('', [
      stringValidator({ minLength: 8, maxLength: 120 }),
    ]),
    status: new FormControl(REPAIR_STATUS[0], [
      stringValidator({
        minLength: 1,
        maxLength: 32,
        list: REPAIR_STATUS,
      }),
    ]),
    type: new FormControl(REPAIR_TYPES[0], [
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

  constructor(
    private toast: HotToastService,
    private repairService: RepairService,
    private inventoryService: InventoryService,
    private clientService: ClientService,
    private employeeService: EmployeeService
  ) {}

  onSelect = (item: string) => {
    console.log(item);
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formId']) {
      this.btnCloseModalId = `${this.formId}-close-btn`;
    }
  }

  showError = (field: string) => {
    return errorOf(field, this.newRepairForm);
  };

  onSubmit = async () => {
    this.sendingForm = true;
    try {
      console.log(this.newRepairForm.value);
      await this.repairService.postRepair(this.newRepairForm.value);
      this.toast.success('Reparación añadida');
      clickCloseBtnModal(this.btnCloseModalId);
      this.newRepairForm.reset();
      if (this.onSuccessSubmit) this.onSuccessSubmit();
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
    this.employeeService.getEmployees().then((res) => {
      this.employees = res.data;
    });
  }
}
