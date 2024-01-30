import { Routes } from '@angular/router';
import {AdministratorComponent} from "./component/administrator/administrator.component";
import {AdminDashboardComponent} from "./component/admin-dashboard/admin-dashboard.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AdministratorComponent,
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent
      },
    ]
  }
];
