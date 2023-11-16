import { FormControl } from '@angular/forms';

export type AuthorizationForm = {
  login: FormControl<string | null>;
  password: FormControl<string | null>;
};
export type RegistrationForm = {
  login: FormControl<string | null>;
  password: FormControl<string | null>;
  name: FormControl<string |null>
  gender: FormControl<string|null>;
};