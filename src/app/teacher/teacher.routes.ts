import { Routes } from '@angular/router';
import {TeacherComponent} from "./component/teacher/teacher.component";
import {TeacherDashboardComponent} from "./component/teacher-dashboard/teacher-dashboard.component";


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TeacherComponent,
    children: [
      {
        path: 'dashboard',
        component: TeacherDashboardComponent
      },
    ]
  }
];
