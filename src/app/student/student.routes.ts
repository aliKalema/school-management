import { Routes } from '@angular/router';
import {StudentDashboardComponent} from "./component/student-dashboard/student-dashboard.component";
import {StudentComponent} from "./component/student/student.component";


export const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    component: StudentComponent
  }
];
