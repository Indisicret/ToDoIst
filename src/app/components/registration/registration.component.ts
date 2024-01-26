import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { generateRegForm } from '../../config/methods';
import { RegistrationForm, UserCreate } from '../../config/types';
import { UserService } from '../../services/user.service';
import { OPTIONSGENDER, RegistrationLabels } from './config/constants';

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
  
  
  registrationLabels = RegistrationLabels;
  regForm: FormGroup<RegistrationForm>;

  optionsGender = OPTIONSGENDER
    
  constructor(private userService: UserService, private router: Router) {
    this.regForm = generateRegForm( )
  }

  regClick() {
    const result = this.userService.registration(
      this.regForm.getRawValue() as UserCreate
    );
    if (result) {
      this.router.navigate(['/tasks']);
    }
  }

  authClick() {
    this.router.navigate(['/authorization']);
  }
}
