import { FormControl } from '@angular/forms';
import { type } from 'os';

export type AuthorizationForm = {
  login: FormControl<string | null>;
  password: FormControl<string | null>;
};
export type RegistrationForm = {
  login: FormControl<string | null>;
  password: FormControl<string | null>;
  name: FormControl<string | null>;
  gender: FormControl<string | null>;
};
export type AddTaskForm = {
  name: FormControl<string | null>;
  category: FormControl<string | null>;
  deadLineDate: FormControl<Date | string | null>;
  description: FormControl<string | null>;
  priority: FormControl<string | null>;
};

export type User = {
  login: string;
  password: string;
  name: string;
  gender: string;
  id?: number;
};

export type Task = {
  id?: number;
  name: string;
  category: string;
  deadLineDate: string;
  description: string;
  priority: string;
  userId: number;
};
export type Column = {
  field: string;
  header: string;
};
