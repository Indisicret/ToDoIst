import { FormControl } from '@angular/forms';

export type AuthorizationForm = {
  login: FormControl<string | null>;
  password: FormControl<string | null>;
};
