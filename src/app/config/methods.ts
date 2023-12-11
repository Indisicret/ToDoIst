import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PRIORITIES } from './constants';
import { AddTaskForm, Category, SearchForm, Task } from './types';

export const getPriority = (code: string): string => {
  const label = PRIORITIES.find((item) => item.value === code)?.label;
  return label ?? '';
};

export const getCategoryName = (categoryId: number, categories: Category[]) => {
  const category = categories.find((item) => item.id === categoryId);
  return category?.name ?? '';
};

export const generateFormSearch = (): FormGroup<SearchForm> => {
  return new FormGroup<SearchForm>({
    name: new FormControl<string | null>(null),
    category: new FormControl<number | null>(null),
    deadLineDate: new FormControl<Date | string | null>(null),
    description: new FormControl<string | null>(null),
    priority: new FormControl<string | null>(null),
    done: new FormControl<boolean | null>(null),
    id: new FormControl<number | null>(null),
  });
};
export const generateEditTaskForm = (task?:Task): FormGroup<AddTaskForm> => {
  return new FormGroup<AddTaskForm>({
    name: new FormControl<string | null>(task?.name ?? null, [
      Validators.required,
      Validators.maxLength(40),
    ]),
    category: new FormControl<number | null>(
      (task?.category as number) ?? null
    ),
    deadLineDate: new FormControl<Date | string | null>(
      task?.deadLineDate ?? null
    ),
    description: new FormControl<string | null>(
      task?.description ?? null,
      Validators.maxLength(300)
    ),
    priority: new FormControl<string | null>(task?.priority ?? null, [
      Validators.required,
    ]),
  });
}