import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  ConfirmationService,
  MessageService
} from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { COLUMNS, MESSAGES } from '../../config/constants';
import { Column, Task } from '../../config/types';
import { TaskService } from '../../services/task.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';

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
    CheckboxModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  providers: [DialogService, TaskService, ConfirmationService, MessageService],
})
export class TaskListComponent {
  tasks: Task[] = [];
  formGroup: FormGroup | undefined;

  cols: Column[] = COLUMNS;
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
        if (result) {
          this.tasks = this.taskService.getTask();
          this.messageServis.add(MESSAGES.add);
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
          this.messageServis.add(MESSAGES.edit);
        }
      });
  }
  // ngOnInit(){
  //   this.formGroup = FormGroup({
  //     status:new FormControl<string | null>(null)
  //   })
  // }

  clickDeleteIcon(task: Task) {
    this.confimationService.confirm({
      message: 'Вы уверены, что хотите удалить эту задачу',
      header: 'Удаление задачи',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deleteTask(task);
        this.tasks = this.taskService.getTask();
        this.messageServis.add(MESSAGES.delete);
      },
    });
  }

  private deleteTask(task: Task) {
    this.taskService.deleteTask(task.id ?? 0);
  }
}
