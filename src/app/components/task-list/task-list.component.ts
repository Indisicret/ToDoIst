import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Column, Task } from '../../config/types';
import { Button, ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TaskService } from '../../services/task.service';

@Component({
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, DynamicDialogModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  providers: [DialogService, TaskService],
})
export class TaskListComponent {
  tasks: Task[] = [];

  cols: Column[] = [
    { field: 'id', header: '№' },
    { field: 'name', header: 'Название' },
    { field: 'description', header: 'Описание' },
    { field: 'deadLineDate', header: 'Срок выполнения' },
    { field: 'category', header: 'Категория' },
    { field: 'priority', header: 'Приоритет' },
  ];
  constructor(
    private dialogService: DialogService,
    private taskService: TaskService
  ) {
    this.tasks = this.taskService.getTask();
  }

  addTask() {
    this.dialogService.open(AddTaskComponent, {
      header: 'Добавить задачу',
      width: '500px',
    });
  }
}
