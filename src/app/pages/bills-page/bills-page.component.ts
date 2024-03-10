import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingTableComponent } from '../../components/tableStates/loading-table/loading-table.component';
import { EmptyTableComponent } from '../../components/tableStates/empty-table/empty-table.component';
import { ErrorTableComponent } from '../../components/tableStates/error-table/error-table.component';
import getErrorMessage from '../../utils/errors';
import { refreshFlowbite } from '../../utils/flowbite';
import { objectIdToInputDate } from '../../utils/texts';
import { BillService } from '../../services/bill.service';
import { HotToastService } from '@ngneat/hot-toast';
import { BillModel, DEFAULT_BILL } from '../../../models/BillModel';
import copy from 'copy-to-clipboard';
import { UpdateBillFormComponent } from '../../components/forms/update-bill-form/update-bill-form.component';
import { SearchInputComponent } from '../../components/inputs/search-input/search-input.component';
import { RemoveFilterButtonComponent } from '../../components/inputs/remove-filter-button/remove-filter-button.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BillFilterModalComponent } from '../../components/modals/bill-filter-modal/bill-filter-modal.component';

@Component({
  selector: 'app-bills-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LoadingTableComponent,
    EmptyTableComponent,
    ErrorTableComponent,
    UpdateBillFormComponent,
    SearchInputComponent,
    RemoveFilterButtonComponent,
    BillFilterModalComponent,
    RouterLink,
  ],
  templateUrl: './bills-page.component.html',
})
export class BillsPageComponent {
  bills: BillModel[] = [];
  billUpdateFormValues: BillModel = DEFAULT_BILL;
  updateBillFormId = 'updateBillFormId';
  filterBillFormId = 'filterBillFormId';
  loading = true;
  error: undefined | string;
  totalAmount = 0;
  currentFilter: Record<string, string> = {};

  constructor(
    private toast: HotToastService,
    private route: ActivatedRoute,
    private billService: BillService
  ) {}

  objectIdDate = objectIdToInputDate;

  copyText = (str: string) => {
    copy(str);
    this.toast.success('Copiado!');
  };

  refreshPage = () => {
    this.getBills();
  };

  getBills = async () => {
    try {
      this.error = undefined;
      const bills = await this.billService.getBills(this.currentFilter);
      this.bills = bills.data;
      this.totalAmount = this.billService.getSumPrice(bills.data);
      this.loading = false;
      refreshFlowbite(250);
    } catch (e) {
      const errorMessage = getErrorMessage(e);
      this.error = errorMessage;
      this.toast.error(errorMessage);
    }
  };

  setEditBillValues = (bill: BillModel) => {
    this.billUpdateFormValues = bill;
  };

  deleteBill = async (id: string) => {
    const confirmed = confirm('¿Estas seguro de eliminar esta factura?');
    if (!confirmed) return;
    try {
      await this.billService.deleteBill(id);
      this.toast.success('Factura eliminada');
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
      this.getBills();
    });
  }
}
