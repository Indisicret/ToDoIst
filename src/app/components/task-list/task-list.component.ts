import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Column, Task } from '../../config/types';
import { Button, ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, DynamicDialogModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  providers: [DialogService],
})
export class TaskListComponent {
  tasks: Task[] = [
    {
      id: 1,
      name: 'Кофе',
      description: 'Налить воды в чайник',
      deadLineDate: '07.11.2033',
      category: 'Дом',
      priority: 'Важное',
      userId: 1,
    },
    {
      id: 2,
      name: ' Покормить кота',
      description: 'заказать корм в доставке, поменять воду',
      deadLineDate: '07.11.2033',
      category: 'Дом',
      priority: 'срочное',
      userId: 1,
    },
    {
      id: 3,
      name: 'Задание для стажерки',
      description: 'создать таск менеджер, согласно тз',
      deadLineDate: '23.12.2023',
      category: 'Работа',
      priority: 'важное',
      userId: 1,
    },
  ];

  cols: Column[] = [
    { field: 'id', header: '№' },
    { field: 'name', header: 'Название' },
    { field: 'description', header: 'Описание' },
    { field: 'deadLineDate', header: 'Срок выполнения' },
    { field: 'category', header: 'Категория' },
    { field: 'priority', header: 'Приоритет' },
  ];
  constructor(public dialogService: DialogService) {}

  addTask() {
    this.dialogService.open(AddTaskComponent, {
      header: 'Добавить задачу',
      width: '500px',
    });
  }
}
