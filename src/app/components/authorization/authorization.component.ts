import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AuthorizationForm } from '../../config/types';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MyValidators } from '../../config/my.validators';
@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule, InputTextModule,ButtonModule],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss',
})
export class AuthorizationComponent {
  authorForm: FormGroup<AuthorizationForm>;

  constructor() {
    this.authorForm = new FormGroup<AuthorizationForm>({
      login: new FormControl<string | null>(null,[
        Validators.email,
        Validators.required
      ]),
      password: new FormControl<string | null>(null,[
        Validators.required,
        Validators.minLength(6)
      ]),
    
    });
  }
}
