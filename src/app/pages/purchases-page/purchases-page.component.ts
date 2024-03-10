import { Component } from '@angular/core';
import getErrorMessage from '../../utils/errors';
import { refreshFlowbite } from '../../utils/flowbite';
import copy from 'copy-to-clipboard';
import { objectIdToInputDate } from '../../utils/texts';
import { PurchaseService } from '../../services/purchase.service';
import { HotToastService } from '@ngneat/hot-toast';
import { PurchaseModel } from '../../../models/PurchaseModel';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingTableComponent } from '../../components/tableStates/loading-table/loading-table.component';
import { EmptyTableComponent } from '../../components/tableStates/empty-table/empty-table.component';
import { ErrorTableComponent } from '../../components/tableStates/error-table/error-table.component';
import { SearchInputComponent } from '../../components/inputs/search-input/search-input.component';
import { RemoveFilterButtonComponent } from '../../components/inputs/remove-filter-button/remove-filter-button.component';
import { ActivatedRoute } from '@angular/router';
import { PurchaseFilterModalComponent } from '../../components/modals/purchase-filter-modal/purchase-filter-modal.component';

@Component({
  selector: 'app-purchases-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LoadingTableComponent,
    EmptyTableComponent,
    ErrorTableComponent,
    SearchInputComponent,
    RemoveFilterButtonComponent,
    PurchaseFilterModalComponent,
  ],
  templateUrl: './purchases-page.component.html',
})
export class PurchasesPageComponent {
  purchases: PurchaseModel[] = [];
  loading = true;
  error: undefined | string;
  totalCost = 0;
  currentFilter: Record<string, string> = {};
  filterPurchaseFormId = 'filterPurchaseFormId';

  constructor(
    private toast: HotToastService,
    private route: ActivatedRoute,
    private purchaseService: PurchaseService
  ) {}

  objectIdDate = objectIdToInputDate;

  copyText = (str: string) => {
    copy(str);
    this.toast.success('Copiado!');
  };

  refreshPage = () => {
    this.getPurchases();
  };

  getPurchases = async () => {
    try {
      this.error = undefined;
      const purchases = await this.purchaseService.getPurchases(
        this.currentFilter
      );
      this.purchases = purchases.data;
      this.totalCost = this.purchaseService.getSumCost(purchases.data);
      this.loading = false;
      refreshFlowbite(250);
    } catch (e) {
      const errorMessage = getErrorMessage(e);
      this.error = errorMessage;
      this.toast.error(errorMessage);
    }
  };

  deletePurchase = async (id: string) => {
    const confirmed = confirm('¿Estas seguro de eliminar este purchasee?');
    if (!confirmed) return;
    try {
      await this.purchaseService.deletePurchase(id);
      this.toast.success('Compra eliminado');
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
      this.getPurchases();
    });
  }
}
