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
import { InputTextModule } from 'primeng/inputtext';
import { AuthorizationForm } from '../../config/types';
import { UserService } from '../../services/user.service';
import { generateAuthorForm } from '../../config/methods';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss',
})
export class AuthorizationComponent {
  authorForm: FormGroup<AuthorizationForm>;

  constructor(private userService: UserService, private router: Router) {
    this.authorForm = generateAuthorForm()
  }

  authClick() {
    const login = this.authorForm.getRawValue().login;
    const password = this.authorForm.getRawValue().password;
    if (login && password) {
      const result = this.userService.authorization(login, password);
      if (result) {
        this.router.navigate(['/tasks']);
      }
    }
  }
  regClick() {
    this.router.navigate(['/registration']);
  }
}
