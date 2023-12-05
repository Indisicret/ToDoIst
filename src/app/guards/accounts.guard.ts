import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const AccountsGuard: CanActivateFn = () => {
  return inject(UserService).getUserId()
    ? true
    : inject(Router).createUrlTree(['/authorization']);
};
