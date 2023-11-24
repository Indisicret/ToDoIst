import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, LOCALE_ID } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TaskService } from '../../services/task.service';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import {AddTaskForm, Task} from '../../config/types';
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
  providers: [TaskService,
    {
      provide: LOCALE_ID,
      useValue:'ru'
    }],
  styleUrl: './edit-task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class EditTaskComponent {
  
editTaskForm: FormGroup<AddTaskForm>;
  optionsPriority = [
    { label: 'Низкий', value: 'low' },
    { label: 'Средний', value: 'mid' },
    { label: 'Высокий', value: 'high' },
  ];
  optionsCategory = [
    { label: 'Дом', value: 'Home' },
    { label: 'Работа', value: 'Work' },
    
  ];
  constructor(private taskService: TaskService,private dialogRef: DynamicDialogRef, private config:DynamicDialogConfig) {
    console.log(this.config)
    const task:Task = this.config.data.task;

    this.editTaskForm = new FormGroup<AddTaskForm>({
      name: new FormControl<string | null>(task.name, [
        Validators.required,
        Validators.maxLength(20),
      ]),
      category: new FormControl<string | null>(task.category),
      deadLineDate: new FormControl<Date | string | null>(task.deadLineDate),
      description: new FormControl<string | null>(
        task.description,
        Validators.maxLength(100)
      ),
      priority: new FormControl<string | null>(task.priority, [Validators.required]),
    });
  }

  saveTask(){}
}
