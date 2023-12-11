import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RegistrationForm, User } from '../../config/types';
import { UserService } from '../../services/user.service';
import { generateRegForm } from '../../config/methods';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  regForm: FormGroup<RegistrationForm>;
  optionsGender = [
    { label: 'Мужской', value: 'man' },
    { label: 'Женский', value: 'woman' },
  ];

  constructor(private userService: UserService, private router: Router) {
    this.regForm = generateRegForm( )
  }

  regClick() {
    const result = this.userService.registration(
      this.regForm.getRawValue() as User
    );
    if (result) {
      this.router.navigate(['/tasks']);
    }
  }
  authClick() {
    this.router.navigate(['/authorization']);
    
  }
}
