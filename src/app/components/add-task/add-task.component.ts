import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { AddTaskForm } from '../../config/types';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    CommonModule,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    
  ],
  templateUrl: './add-task.component.html',
  providers:[],
  styleUrl: './add-task.component.scss',

})
export class AddTaskComponent {
  addTaskForm: FormGroup<AddTaskForm>;
  constructor() {
    this.addTaskForm = new FormGroup<AddTaskForm>({
      nameTask: new FormControl<string | null>(null, [
        Validators.required,
      ]),
      category: new FormControl<string | null>(null, [Validators.required]),
      deadLineDate: new FormControl<string | null>(null, [Validators.required]),
      description: new FormControl<string | null>(null, [Validators.required]),
      priority: new FormControl<string | null>(null, [Validators.required]),
    });
  }

  
  
  
}