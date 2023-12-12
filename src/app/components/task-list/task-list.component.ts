import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  signal,
} from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import cloneDeep from 'lodash/cloneDeep';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import {
  BehaviorSubject,
  Observable,
  Subject,
  debounceTime,
  takeUntil,
} from 'rxjs';
import { COLUMNS, MESSAGES, PRIORITIES, STATUS } from '../../config/constants';
import { generateFormSearch, getCategoryName, getPriority } from '../../config/methods';
import { Category, Column, SearchForm, Task } from '../../config/types';
import { CategoryService } from '../../services/category.service';
import { TaskService } from '../../services/task.service';
import { AddEditTaskComponent } from '../add-edit-task/add-edit-task.component';

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
export class TaskListComponent implements OnDestroy {
  searchForm: FormGroup<SearchForm>;
  optionsPriority = PRIORITIES;

  optionsStatus = STATUS;
  optionsCategory$: Observable<Category[]> =
    this.categoryService.categoriesUser$;
  tasksTable$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  cols: Column[] = COLUMNS;
  visebleSearch = signal(false);

  private tasks: Task[] = [];
  private destroy$: Subject<void> = new Subject<void>();
  private categories: Category[] = [];

  constructor(
    private dialogService: DialogService,
    private taskService: TaskService,
    private confimationService: ConfirmationService,
    private messageServis: MessageService,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.categories = this.categoryService.getCategories();
    this.taskService.tasksUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((values) => {
        const tasks = values;
        this.tasks = cloneDeep(tasks);
        tasks.forEach((item) => {
          item.priority = getPriority(item.priority);
          item.category = getCategoryName(
            item.category as number,
            this.categories
          );
        });
        this.tasksTable$.next(tasks);
      });
    this.searchForm = generateFormSearch();
    this.formSearchChanges();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
      .onClose.pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
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

  private formSearchChanges() {
    this.searchForm.valueChanges
      .pipe(debounceTime(500), takeUntil(this.destroy$))
      .subscribe((formValues) => {
        let taskSearch: Task[] = this.tasks;
        Object.keys(formValues).forEach((key: string) => {
          if (formValues[key as keyof SearchForm]) {
            if (key === 'name' || key === 'description') {
              taskSearch = taskSearch.filter((item) =>
                item[key]
                  .toUpperCase()
                  .includes((formValues[key] as string).toUpperCase())
              );
            } else {
              taskSearch = taskSearch.filter(
                (item) =>
                  item[key as keyof SearchForm] ===
                  formValues[key as keyof SearchForm]
              );
            }
          }
        });
        const taskSearchTable = cloneDeep(taskSearch);
        taskSearchTable.forEach((item) => {
          item.priority = getPriority(item.priority);
          item.category = getCategoryName(
            item.category as number,
            this.categories
          );
        });
        this.tasksTable$.next(taskSearchTable);
      });
  }
}
