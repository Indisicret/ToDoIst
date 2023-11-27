import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { Column, Task } from '../../config/types';
import { TaskService } from '../../services/task.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DynamicDialogModule,
    EditTaskComponent,
    ConfirmDialogModule,
  ],
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
    this.dialogService
      .open(AddTaskComponent, {
        header: 'Добавить задачу',
        width: '500px',
      })
      .onClose.subscribe(() => {
        this.tasks = this.taskService.getTask();
      });
  }
  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id ?? 0);
  }

  openEditModal(task: Task) {
    this.dialogService
      .open(EditTaskComponent, {
        header: 'Редактирование задачи',
        width: '500px',
        data: {
          task,
        },
      })
      .onClose.subscribe(() => {
        this.tasks = this.taskService.getTask();
      });
  }
}
