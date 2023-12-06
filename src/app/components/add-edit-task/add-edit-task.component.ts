import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, LOCALE_ID } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MESSAGES, PRIORITIES } from '../../config/constants';
import { AddTaskForm, Category, Task } from '../../config/types';
import { TaskService } from '../../services/task.service';
import { CategoryService } from '../../services/category.service';
@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [
    CommonModule,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
  ],
  templateUrl: './add-edit-task.component.html',
  providers: [
    TaskService,
    {
      provide: LOCALE_ID,
      useValue: 'ru',
    },
  ],
  styleUrl: './add-edit-task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditTaskComponent {
  editTaskForm: FormGroup<AddTaskForm>;
  optionsPriority = PRIORITIES;
  optionsCategory: Category[] = [];
  private task: Task | null;

  constructor(
    private taskService: TaskService,
    private dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private categoryService: CategoryService
  ) {
    this.task = this.config.data.task;
    this.optionsCategory = this.categoryService.getCategories();

    this.editTaskForm = new FormGroup<AddTaskForm>({
      name: new FormControl<string | null>(this.task?.name ?? null, [
        Validators.required,
        Validators.maxLength(40),
      ]),
      category: new FormControl<number | null>(
        (this.task?.category as number) ?? null
      ),
      deadLineDate: new FormControl<Date | string | null>(
        this.task?.deadLineDate ?? null
      ),
      description: new FormControl<string | null>(
        this.task?.description ?? null,
        Validators.maxLength(300)
      ),
      priority: new FormControl<string | null>(this.task?.priority ?? null, [
        Validators.required,
      ]),
    });
  }

  saveEditTask() {
    if (this.task) {
      const newTask: Task = {
        ...(this.editTaskForm.getRawValue() as Task),
        userId: this.task.userId,
        id: this.task.id,
      };
      this.taskService.editTask(newTask);
      this.dialogRef.close(MESSAGES.edit);
    } else {
      const task = this.editTaskForm.getRawValue() as unknown as Task;
      this.taskService.addTask(task);
      this.dialogRef.close(MESSAGES.add);
    }
    
  }
}
