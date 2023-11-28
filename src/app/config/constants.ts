
export const PRIORITIES = [
  { label: 'Низкий', value: 'low' },
  { label: 'Средний', value: 'mid' },
  { label: 'Высокий', value: 'high' },
];
export const CATEGORIES = [
  { label: 'Дом', value: 'Home' },
  { label: 'Работа', value: 'Work' },
];

export const COLUMNS = [
  { field: 'id', header: '№' },
  { field: 'name', header: 'Название' },
  { field: 'description', header: 'Описание' },
  { field: 'deadLineDate', header: 'Срок выполнения' },
  { field: 'category', header: 'Категория' },
  { field: 'priority', header: 'Приоритет' },
];

export const MESSAGES = {
  add: {
    severity: 'success',
    summary: 'Выполнено',
    detail: 'Задача добавлена',
  },
  edit: {
    severity: 'success',
    summary: 'Выполнено',
    detail: 'Задача изменена',
  },
  delete: {
    severity: 'success',
    summary: 'Выполнено',
    detail: 'Задача удалена',
  },
};
