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
export const STATUS =[
  { label: 'Выполнено', value: true },
  { label: 'Не выполнено', value: false },
  { label: 'Все', value: null },
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
};
export const MESSAGESEXIT = {
  severity: 'success',
  summary: 'Успешно',
  detail: 'Выход выполнен',
};
export enum ClickExitAccountLabel{
  confirmExit = 'Вы уверены, что хотите выйти ?'
};
export const SETTRANSLATION = {
  firstDayOfWeek: 1,
  dayNames: [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ],
  monthNames: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
  monthNamesShort: [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек',
  ],
  dayNamesShort: ['Воск', 'Пон', 'Вт', 'Ср', 'Четв', 'Пят', 'Суб'],
  dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  weekHeader: 'Неделя',
  today: 'Сегодня',
  dateFormat: 'mm.dd.y',

  clear: 'Очистить',
  
}