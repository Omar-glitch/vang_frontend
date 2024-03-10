import { Component } from '@angular/core';
import getErrorMessage from '../../utils/errors';
import { DEFAULT_HARDWARE, HardwareModel } from '../../../models/HardwareModel';
import { refreshFlowbite } from '../../utils/flowbite';
import copy from 'copy-to-clipboard';
import { objectIdToInputDate } from '../../utils/texts';
import { HotToastService } from '@ngneat/hot-toast';
import { CreateHardwareFormComponent } from '../../components/forms/create-hardware-form/create-hardware-form.component';
import { UpdateHardwareFormComponent } from '../../components/forms/update-hardware-form/update-hardware-form.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoadingTableComponent } from '../../components/tableStates/loading-table/loading-table.component';
import { EmptyTableComponent } from '../../components/tableStates/empty-table/empty-table.component';
import { ErrorTableComponent } from '../../components/tableStates/error-table/error-table.component';
import { HardwareService } from '../../services/hardware.service';
import { BuyHardwareFormComponent } from '../../components/forms/buy-hardware-form/buy-hardware-form.component';
import { SearchInputComponent } from '../../components/inputs/search-input/search-input.component';
import { RemoveFilterButtonComponent } from '../../components/inputs/remove-filter-button/remove-filter-button.component';
import { HardwareFilterModalComponent } from '../../components/modals/hardware-filter-modal/hardware-filter-modal.component';

@Component({
  selector: 'app-hardwares-page',
  standalone: true,
  imports: [
    RouterLink,
    CreateHardwareFormComponent,
    UpdateHardwareFormComponent,
    LoadingTableComponent,
    EmptyTableComponent,
    ErrorTableComponent,
    BuyHardwareFormComponent,
    SearchInputComponent,
    RemoveFilterButtonComponent,
    HardwareFilterModalComponent,
  ],
  templateUrl: './hardwares-page.component.html',
})
export class HardwaresPageComponent {
  hardwares: HardwareModel[] = [];
  hardwareUpdateFormValues: HardwareModel = DEFAULT_HARDWARE;
  hardwareBuyId = '';
  hardwareBuyName = '';
  createHardwareFormId = 'createHardwareFormId';
  updateHardwareFormId = 'updateHardwareFormId';
  updateBuyHardwareFormId = 'updateBuyHardwareFormId';
  filterHardwareFormId = 'filterHardwareFormId';
  loading = true;
  error: string | undefined;
  currentFilter: Record<string, string> = {};

  constructor(
    private toast: HotToastService,
    private route: ActivatedRoute,
    private hardwareService: HardwareService
  ) {}

  objectIdDate = objectIdToInputDate;

  copyText = (str: string) => {
    copy(str);
    this.toast.success('Copiado!');
  };

  refreshPage = () => {
    this.getHardwares();
  };

  getHardwares = async () => {
    try {
      this.error = undefined;
      const hardwares = await this.hardwareService.getHardwares(
        this.currentFilter
      );
      this.hardwares = hardwares.data;
      this.loading = false;
      refreshFlowbite(250);
    } catch (e) {
      const errorMessage = getErrorMessage(e);
      this.error = errorMessage;
      this.toast.error(errorMessage);
    }
  };

  setEditHardwareValues = (hardware: HardwareModel) => {
    this.hardwareUpdateFormValues = hardware;
  };

  setBuyId = (id: string, name: string) => {
    this.hardwareBuyId = id;
    this.hardwareBuyName = name;
  };

  deleteHardware = async (id: string) => {
    const confirmed = confirm('¿Estas seguro de eliminar este equipo?');
    if (!confirmed) return;
    try {
      await this.hardwareService.deleteHardware(id);
      this.toast.success('Equipo eliminado');
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
      this.getHardwares();
    });
  }
}
