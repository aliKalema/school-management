import { Routes } from '@angular/router';
import {authGuard} from "./shared/guard/auth.guard";
import {LoginComponent} from "./shared/component/login/login.component";
import {PageNotFoundComponent} from "./shared/component/page-not-found/page-not-found.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'student',
    canActivate: [authGuard],
    loadChildren: () => import('./student/student.routes') .then(m => m.routes)
  },
  {
    path: 'teacher',
     canActivate: [authGuard],
    loadChildren: () => import('./teacher/teacher.routes') .then(m => m.routes)
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () => import('./administrator/administrator.routes') .then(m => m.routes)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
