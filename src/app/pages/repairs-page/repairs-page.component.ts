import { Component } from '@angular/core';
import { ErrorTableComponent } from '../../components/tableStates/error-table/error-table.component';
import { EmptyTableComponent } from '../../components/tableStates/empty-table/empty-table.component';
import { LoadingTableComponent } from '../../components/tableStates/loading-table/loading-table.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import getErrorMessage from '../../utils/errors';
import { DEFAULT_REPAIR, RepairModel } from '../../../models/RepairModel';
import { DEFAULT_FLOWBITE_TIME, refreshFlowbite } from '../../utils/flowbite';
import copy from 'copy-to-clipboard';
import { HotToastService } from '@ngneat/hot-toast';
import { CreateRepairFormComponent } from '../../components/forms/create-repair-form/create-repair-form.component';
import { UpdateRepairFormComponent } from '../../components/forms/update-repair-form/update-repair-form.component';
import { RepairService } from '../../services/repair.service';
import { SearchInputComponent } from '../../components/inputs/search-input/search-input.component';
import { RemoveFilterButtonComponent } from '../../components/inputs/remove-filter-button/remove-filter-button.component';
import { RepairFilterModalComponent } from '../../components/modals/repair-filter-modal/repair-filter-modal.component';
import { objectIdToInputDate } from '../../utils/texts';

@Component({
  selector: 'app-repairs-page',
  standalone: true,
  imports: [
    RouterLink,
    CreateRepairFormComponent,
    UpdateRepairFormComponent,
    LoadingTableComponent,
    EmptyTableComponent,
    ErrorTableComponent,
    SearchInputComponent,
    RemoveFilterButtonComponent,
    RepairFilterModalComponent,
  ],
  templateUrl: './repairs-page.component.html',
})
export class RepairsPageComponent {
  repairs: RepairModel[] = [];
  repairUpdateFormValues: RepairModel = DEFAULT_REPAIR;
  createRepairFormId = 'createRepairFormId';
  updateRepairFormId = 'updateRepairFormId';
  filterRepairFormId = 'filterRepairFormId';
  loading = true;
  error: string | undefined;
  totalPrice = 0;
  currentFilter: Record<string, string> = {};

  constructor(
    private toast: HotToastService,
    private route: ActivatedRoute,
    private repairService: RepairService
  ) {}

  objectIdDate = objectIdToInputDate;

  copyText = (str: string) => {
    copy(str);
    this.toast.success('Copiado!');
  };

  refreshPage = () => {
    this.getRepairs();
  };

  getRepairs = async () => {
    try {
      this.error = undefined;
      const repairs = await this.repairService.getRepairs(this.currentFilter);
      this.repairs = repairs.data;
      this.totalPrice = this.repairService.getSumPrice(repairs.data);
      this.loading = false;
      refreshFlowbite(DEFAULT_FLOWBITE_TIME);
    } catch (e) {
      const errorMessage = getErrorMessage(e);
      this.error = errorMessage;
      this.toast.error(errorMessage);
    }
  };

  setEditRepairValues = (repair: RepairModel) => {
    this.repairUpdateFormValues = repair;
  };

  generateBill = async (id: string) => {
    try {
      await this.repairService.generateBill(id);
      this.toast.success('Factura regenerada');
    } catch (e) {
      this.toast.error(getErrorMessage(e));
    }
  };

  deleteRepair = async (id: string) => {
    const confirmed = confirm('¿Estas seguro de eliminar este reparación?');
    if (!confirmed) return;
    try {
      await this.repairService.deleteRepair(id);
      this.toast.success('Reparación eliminada');
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
      this.getRepairs();
    });
  }
}
