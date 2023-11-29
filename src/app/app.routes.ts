import { Routes } from '@angular/router';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';

export const routes: Routes = [
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
    component : TaskListComponent
  },
  {
    path: 'categories', 
    component : CategoriesListComponent
  },
];
