import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RegistrationForm } from '../../config/types';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {

  regForm: FormGroup<RegistrationForm>; 
  optionsGender = [{ label: 'Мужской', value: 'man' },{label: 'Женский', value: 'woman'}];

  constructor() {
    this.regForm = new FormGroup<RegistrationForm>({
      login: new FormControl<string | null>(null),
      password: new FormControl<string | null>(null),
      name: new FormControl<string | null>(null),
      gender: new FormControl<string | null>(null),
    });
  }
}
