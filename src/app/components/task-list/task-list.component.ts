import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import cloneDeep from 'lodash/cloneDeep';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { COLUMNS, MESSAGES } from '../../config/constants';
import { getCategoryName, getPriority } from '../../config/methods';
import { Column, Task } from '../../config/types';
import { TaskService } from '../../services/task.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { CategoryService } from '../../services/category.service';


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
    RouterLink,
    
    
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  providers: [DialogService, TaskService, ConfirmationService, MessageService],
})
export class TaskListComponent {
  tasksTable: Task[] = [];
  cols: Column[] = COLUMNS;

  private tasks: Task[] = [];

  constructor(
    private dialogService: DialogService,
    private taskService: TaskService,
    private confimationService: ConfirmationService,
    private messageServis: MessageService,
    private router: Router,
    private categoryService: CategoryService,
  ) {
    this.getTasks();
  }

  addTask() {
    this.dialogService
      .open(AddTaskComponent, {
        header: 'Добавить задачу',
        width: '500px',
      })
      .onClose.subscribe((result) => {
        if (result) {
          this.getTasks();
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
          task: this.tasks.find(item=>item.id===task.id),
        },
      })
      .onClose.subscribe((result) => {
        if (result) {
          this.getTasks();
          this.messageServis.add(MESSAGES.edit);
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
        this.getTasks();
        this.messageServis.add(MESSAGES.delete);
      },
    });
  }

  openCategories(){
    this.router.navigate(['/categories']);
  }

  private deleteTask(task: Task) {
    this.taskService.deleteTask(task.id ?? 0);
  }


  private getTasks() {
    const tasks = this.taskService.getTask();
    this.tasks = cloneDeep(tasks);
    const categories= this.categoryService.getCategories()

    tasks.forEach((item) => {
      item.priority = getPriority(item.priority);
      item.category = getCategoryName(item.category as number,categories );
    });
    this.tasksTable = tasks;
  }
  
}
