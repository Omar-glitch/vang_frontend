import { Routes } from '@angular/router';
import { EmployeesPageComponent } from './pages/employees-page/employees-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ClientPageComponent } from './pages/client-page/client-page.component';
import { InventoriesPageComponent } from './pages/inventories-page/inventories-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HardwaresPageComponent } from './pages/hardwares-page/hardwares-page.component';
import { RepairsPageComponent } from './pages/repairs-page/repairs-page.component';
import { PurchasesPageComponent } from './pages/purchases-page/purchases-page.component';
import { BillsPageComponent } from './pages/bills-page/bills-page.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Página de inicio | Reps',
    component: HomePageComponent,
  },
  {
    path: 'dashboard/clients',
    title: 'Clientes | Reps',
    component: ClientPageComponent,
  },
  {
    path: 'dashboard/employees',
    title: 'Empleados | Reps',
    component: EmployeesPageComponent,
  },
  {
    path: 'dashboard/inventories',
    title: 'Inventario | Reps',
    component: InventoriesPageComponent,
  },
  {
    path: 'dashboard/hardwares',
    title: 'Equipos | Reps',
    component: HardwaresPageComponent,
  },
  {
    path: 'dashboard/repairs',
    title: 'Reparaciones | Reps',
    component: RepairsPageComponent,
  },
  {
    path: 'dashboard/purchases',
    title: 'Compras | Reps',
    component: PurchasesPageComponent,
  },
  {
    path: 'dashboard/bills',
    title: 'Facturas | Reps',
    component: BillsPageComponent,
  },
  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];
