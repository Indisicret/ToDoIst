import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AddTaskForm } from '../../config/types';


@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    CommonModule,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule
    
  ],
  templateUrl: './add-task.component.html',
  providers:[],
  styleUrl: './add-task.component.scss',

})
export class AddTaskComponent {
  addTaskForm: FormGroup<AddTaskForm>;
  optionsPriority = [
    { label: 'Низкий', value: 'low' },
    { label: 'Средний', value: 'mid' },
    { label: 'Высокий', value: 'high' }
  ]
  optionsCategory=[
    { label: 'Дом', value: 'Home' },
    { label: 'Работа', value: 'Work' },

  ]

  constructor() {
    this.addTaskForm = new FormGroup<AddTaskForm>({
      nameTask: new FormControl<string | null>(null, [
        Validators.required,
        Validators.maxLength(20)
      ]),
      category: new FormControl<string | null>(null),
      deadLineDate: new FormControl<Date | string | null>(null),
      description: new FormControl<string | null>(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      priority: new FormControl<string | null>(null, [Validators.required]),
    });
  }

  
  
  
}