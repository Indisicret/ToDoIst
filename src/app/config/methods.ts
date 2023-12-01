import { PRIORITIES } from './constants';
import { Category } from './types';
export const getPriority = (code: string): string => {
  const label = PRIORITIES.find((item) => item.value === code)?.label;
  return label ?? '';
};

export const getCategoryName = (categoryId: number, categories: Category[]) => {
  const category = categories.find((item) => item.id === categoryId);
  return category?.name ?? '';
};
