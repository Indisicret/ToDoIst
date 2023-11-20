import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Column, Task } from '../../config/types';


@Component({
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  tasks: Task[] = [
    {
      id: 1,
      name: 'Кофе',
      description: 'Налить воды в чайник',
      deadLineDate: '07.11.2033',
      category: 'Дом',
    },
    {
      id: 2,
      name: ' Покормить кота',
      description: 'заказать корм в доставке, поменять воду',
      deadLineDate: '07.11.2033',
      category: 'Дом',
    },
    {
      id: 3,
      name: 'Задание для стажерки',
      description: 'создать таск менеджер, согласно тз',
      deadLineDate: '23.12.2023',
      category: 'Работа',
    },
  ];
  cols: Column[] = [
    { field: 'id', header: '№' },
    { field: 'name', header: 'Название' },
    { field: 'description', header: 'Описание' },
    { field: 'deadLineDate', header: 'Срок выполнения' },
    { field: 'category', header: 'Категория' },
  ];
}
