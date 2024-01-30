import { Routes } from '@angular/router';
import {StudentDashboardComponent} from "./component/student-dashboard/student-dashboard.component";
import {StudentComponent} from "./component/student/student.component";


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: StudentComponent,
    children: [
      {
        path: 'dashboard',
        component: StudentDashboardComponent
      },
    ]
  }
];
