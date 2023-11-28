import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, LOCALE_ID } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TaskService } from '../../services/task.service';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { AddTaskForm, Task } from '../../config/types';
import { CATEGORIES, PRIORITIES } from '../../config/constants';
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
  templateUrl: './edit-task.component.html',
  providers: [
    TaskService,
    {
      provide: LOCALE_ID,
      useValue: 'ru',
    },
  ],
  styleUrl: './edit-task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTaskComponent {
  editTaskForm: FormGroup<AddTaskForm>;
  optionsPriority = PRIORITIES;
  optionsCategory = CATEGORIES;
  private task: Task;

  constructor(
    private taskService: TaskService,
    private dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {
    this.task = this.config.data.task;

    this.editTaskForm = new FormGroup<AddTaskForm>({
      name: new FormControl<string | null>(this.task.name, [
        Validators.required,
        Validators.maxLength(20),
      ]),
      category: new FormControl<string | null>(this.task.category),
      deadLineDate: new FormControl<Date | string | null>(
        this.task.deadLineDate
      ),
      description: new FormControl<string | null>(
        this.task.description,
        Validators.maxLength(100)
      ),
      priority: new FormControl<string | null>(this.task.priority, [
        Validators.required,
      ]),
    });
  }

  saveEditTask() {
    const newTask: Task = {
      ...(this.editTaskForm.getRawValue() as Task),
      userId: this.task.userId,
      id: this.task.id,
    };
    this.taskService.editTask(newTask);
    this.dialogRef.close(true);
  }
}
