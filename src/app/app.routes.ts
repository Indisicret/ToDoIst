import { Routes } from '@angular/router';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { RegistrationComponent } from './components/registration/registration.component';

export const routes: Routes = [
    {
        path:'login', component:AuthorizationComponent
    },
    {
        path:'registration', component:RegistrationComponent
    }
];
