import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AddTaskForm, Task } from '../../config/types';
import { CalendarModule } from 'primeng/calendar';
import { TaskService } from '../../services/task.service';
import { LOCALE_ID } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CATEGORIES, PRIORITIES } from '../../config/constants';
@Component({
  selector: 'app-add-task',
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
  templateUrl: './add-task.component.html',
  providers: [
    TaskService,
    {
      provide: LOCALE_ID,
      useValue: 'ru',
    },
  ],
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent {
  addTaskForm: FormGroup<AddTaskForm>;
  
  optionsPriority = PRIORITIES;
  optionsCategory = CATEGORIES;

  constructor(
    private taskService: TaskService,
    private dialogRef: DynamicDialogRef
  ) {
    this.addTaskForm = new FormGroup<AddTaskForm>({
      name: new FormControl<string | null>(null, [
        Validators.required,
        Validators.maxLength(20),
      ]),
      category: new FormControl<string | null>(null),
      deadLineDate: new FormControl<Date | string | null>(null),
      description: new FormControl<string | null>(
        null,
        Validators.maxLength(100)
      ),
      priority: new FormControl<string | null>('mid', [Validators.required]),
    });
  }

  saveTask() {
    const task = this.addTaskForm.getRawValue() as unknown as Task;
    this.taskService.addTask(task);
    this.dialogRef.close(true);
  }
}
