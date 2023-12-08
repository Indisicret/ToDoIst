import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import cloneDeep from 'lodash/cloneDeep';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { COLUMNS, MESSAGES, PRIORITIES, STATUS } from '../../config/constants';
import { getCategoryName, getPriority } from '../../config/methods';
import { Category, Column, SearchForm, Task } from '../../config/types';
import { CategoryService } from '../../services/category.service';
import { TaskService } from '../../services/task.service';

import { DropdownModule } from 'primeng/dropdown';
import { BehaviorSubject, Observable, debounceTime, map } from 'rxjs';
import { AddEditTaskComponent } from '../add-edit-task/add-edit-task.component';
import { CalendarModule } from 'primeng/calendar';
import { values } from 'lodash';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DynamicDialogModule,
    AddEditTaskComponent,
    ConfirmDialogModule,
    ToastModule,
    CheckboxModule,
    RouterLink,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    CalendarModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  providers: [DialogService, TaskService, ConfirmationService, MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  searchForm: FormGroup<SearchForm>;
  optionsPriority = PRIORITIES;
  optionsStatus = STATUS;
  optionsCategory$: Observable<Category[]> =
    this.categoryService.categoriesUser$;

  tasksTable$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  cols: Column[] = COLUMNS;
  visebleSearch = signal(false);
  date: Date = new Date();
  private tasks: Task[] = [];

  constructor(
    private dialogService: DialogService,
    private taskService: TaskService,
    private confimationService: ConfirmationService,
    private messageServis: MessageService,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.taskService.tasksUser$.subscribe((values) => {
      console.log(values);
      const tasks = values;
      this.tasks = cloneDeep(tasks);
      const categories = this.categoryService.getCategories();

      tasks.forEach((item) => {
        item.priority = getPriority(item.priority);
        item.category = getCategoryName(item.category as number, categories);
      });
      this.tasksTable$.next(tasks);
    });

    this.searchForm = new FormGroup<SearchForm>({
      name: new FormControl<string | null>(null),
      category: new FormControl<number | null>(null),
      deadLineDate: new FormControl<Date | string | null>(null),
      description: new FormControl<string | null>(null),
      priority: new FormControl<string | null>(null),
      done: new FormControl<boolean | null>(null),
      id: new FormControl<number | null>(null),
    });

    this.searchForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe((formValues) => {
        if (formValues.priority) {
          const taskSearch = this.tasks.filter(
            (item) => item.priority === formValues.priority
          );
          const categories = this.categoryService.getCategories();
          taskSearch.forEach((item) => {
            item.priority = getPriority(item.priority);
            item.category = getCategoryName(
              item.category as number,
              categories
            );
          });
          this.tasksTable$.next(taskSearch);
        }
        if (formValues.category) {
          const taskSearch = this.tasks.filter(
            (item) => item.category === formValues.category
          );
          const categories = this.categoryService.getCategories();
          taskSearch.forEach((item) => {
            item.priority = getPriority(item.priority);
            item.category = getCategoryName(
              item.category as number,
              categories
            );
          });
          this.tasksTable$.next(taskSearch);
        }
        if(formValues.id){const taskSearch = this.tasks.filter(
          (item) => item.id === formValues.id
        );
        const categories = this.categoryService.getCategories();
        taskSearch.forEach((item) => {
          item.priority = getPriority(item.priority);
          item.category = getCategoryName(
            item.category as number,
            categories
          );
        });
        this.tasksTable$.next(taskSearch);
      }
      });
      
  }

  openSearch() {
    this.visebleSearch.set(!this.visebleSearch());
  }

  openEditModal(task?: Task) {
    this.dialogService
      .open(AddEditTaskComponent, {
        header: task ? 'Редактирование задачи' : 'Добавить задачу',
        width: '500px',
        data: {
          task: task ? this.tasks.find((item) => item.id === task.id) : null,
        },
      })
      .onClose.subscribe((result) => {
        if (result) {
          this.taskService.reloadTasks();
          this.messageServis.add(result);
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
        this.messageServis.add(MESSAGES.delete);
      },
    });
  }

  openCategories() {
    this.router.navigate(['/categories']);
  }

  private deleteTask(task: Task) {
    this.taskService.deleteTask(task.id ?? 0);
  }
}
