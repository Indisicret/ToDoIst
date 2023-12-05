
export const PRIORITIES = [
  { label: 'Низкий', value: 'low' },
  { label: 'Средний', value: 'mid' },
  { label: 'Высокий', value: 'high' },
];

export const COLUMNS = [
  { field: 'id', header: 'id' }, 
  { field: 'name', header: 'Название' },
  { field: 'description', header: 'Описание' },
  { field: 'deadLineDate', header: 'Срок выполнения' },
  { field: 'category', header: 'Категория' },
  { field: 'priority', header: 'Приоритет' },
];

export const MESSAGESCATEGORIES = {
  add: {
    severity: 'success',
    summary: 'Выполнено',
    detail: 'Категория добавлена',
  },
  edit: {
    severity: 'success',
    summary: 'Выполнено',
    detail: 'Категория изменена',
  },
  delete: {
    severity: 'success',
    summary: 'Выполнено',
    detail: 'Категория удалена',
  },
};

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
}
export const MESSAGESEXIT = {
    severity: 'success',
    summary: 'Успешно',
    detail: 'Выход выполнен',
  
}