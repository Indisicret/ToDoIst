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
import { ToastModule } from 'primeng/toast';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DynamicDialogModule,
    EditTaskComponent,
    ConfirmDialogModule,
    ToastModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  providers: [DialogService, TaskService, ConfirmationService, MessageService],
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
    private taskService: TaskService,
    private confimationService: ConfirmationService,
    private messageServis: MessageService
  ) {
    this.tasks = this.taskService.getTask();
  }

  addTask() {
    this.dialogService
      .open(AddTaskComponent, {
        header: 'Добавить задачу',
        width: '500px',
      })
      .onClose.subscribe((result) => {
        if (result){
          this.tasks = this.taskService.getTask();
          this.messageServis.add({
            severity: 'success',
            summary: 'Выполнено',
            detail: 'Задача добавлена', 
          });
        }
        
      });
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
      .onClose.subscribe((result) => {
        if (result) {
          this.tasks = this.taskService.getTask();
          this.messageServis.add({
            severity: 'success',
            summary: 'Выполнено',
            detail: 'Задача изменена',
          });
        }
      });
  }

  clickDeleteIcon(task: Task) {
    this.confimationService.confirm({
      message: 'Вы уверены, что хотите удалить эту задачу',
      header: 'Удаление задачи',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deleteTask(task);
        this.tasks=this.taskService.getTask()
        this.messageServis.add({
          severity: 'success',
          summary: 'Выполнено',
          detail: 'Задача удалена',
        });
      },
    });
  }

  private deleteTask(task: Task) {
    this.taskService.deleteTask(task.id ?? 0);
  }
}
