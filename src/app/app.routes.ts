import { Routes } from '@angular/router';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { AccountsGuard } from './guards/accounts.guard';

export const routes: Routes = [
  {
    path: '',
    component : TaskListComponent,
    canActivate: [AccountsGuard]
  },
  {
    path: 'authorization',
    component: AuthorizationComponent,
    
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'tasks',
    component : TaskListComponent,
    canActivate: [AccountsGuard]
  },
  {
    path: 'categories', 
    component : CategoriesListComponent
  },
];
