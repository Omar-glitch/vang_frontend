import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeesPageComponent } from './pages/employees-page/employees-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ClientPageComponent } from './pages/client-page/client-page.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Página de inicio | Reps',
    component: HomeComponent,
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
  // { path: 'edit/:postId',
  // component: PostCreateComponent },
  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];
