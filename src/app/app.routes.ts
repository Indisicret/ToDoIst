import { Routes } from '@angular/router';
import { AuthorizationComponent } from './components/authorization/authorization.component';

export const routes: Routes = [
    {
        path:'login', component:AuthorizationComponent
    }
];
