import { FormControl } from '@angular/forms';

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
  category: FormControl<number | null>;
  deadLineDate: FormControl<Date | string | null>;
  description: FormControl<string | null>;
  priority: FormControl<string | null>;
};

export type AddCategoryForm = {
  name: FormControl<string | null>;
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
  category: string | number;
  deadLineDate: string;
  description: string;
  priority: string;
  userId: number;
  done: boolean;
};
export type Column = {
  field: string;
  header: string;
};

export type Category = {
  name: string;
  id: number;
  userId: number;
};
export type SearchForm = {
  name: FormControl<string | null>;
  category: FormControl<number | null>;
  deadLineDate: FormControl<Date | string | null>;
  description: FormControl<string | null>;
  priority: FormControl<string | null>;
  done: FormControl<boolean | null>;
  id: FormControl<number | null>;
};
