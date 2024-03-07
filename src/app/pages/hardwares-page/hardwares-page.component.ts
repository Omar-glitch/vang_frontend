import { Component } from '@angular/core';
import axios from 'axios';
import { BACKEND_URL } from '../../utils/constants';
import getErrorMessage from '../../utils/errors';
import { DEFAULT_HARDWARE, HardwareModel } from '../../../models/HardwareModel';
import { refreshFlowbite } from '../../utils/flowbite';
import copy from 'copy-to-clipboard';
import { objectIdToInputDate } from '../../utils/texts';
import { HotToastService } from '@ngneat/hot-toast';
import { CreateHardwareFormComponent } from '../../components/forms/create-hardware-form/create-hardware-form.component';
import { UpdateHardwareFormComponent } from '../../components/forms/update-hardware-form/update-hardware-form.component';
import { RouterLink } from '@angular/router';
import { LoadingTableComponent } from '../../components/tableStates/loading-table/loading-table.component';
import { EmptyTableComponent } from '../../components/tableStates/empty-table/empty-table.component';
import { ErrorTableComponent } from '../../components/tableStates/error-table/error-table.component';

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
  ],
  templateUrl: './hardwares-page.component.html',
})
export class HardwaresPageComponent {
  hardwares: HardwareModel[] = [];
  hardwareUpdateFormValues: HardwareModel = DEFAULT_HARDWARE;
  createHardwareFormId = 'createHardwareFormId';
  updateHardwareFormId = 'updateHardwareFormId';
  loading = true;
  error: string | undefined;

  constructor(private toast: HotToastService) {}

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
      const hardwares = await axios.get(`${BACKEND_URL}/hardwares`);
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

  deleteHardware = async (id: string) => {
    const confirmed = confirm('¿Estas seguro de eliminar este equipo?');
    if (!confirmed) return;
    try {
      await axios.delete(`${BACKEND_URL}/hardwares/${id}`);
      this.toast.success('Equipo eliminado');
      this.refreshPage();
    } catch (e) {
      this.toast.error(getErrorMessage(e));
    }
  };

  ngOnInit() {
    this.getHardwares();
  }
}
