import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Category } from '../../config/types';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    RouterLink,
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss',
  providers: [],
})
export class CategoriesListComponent {
  categoriesTable: Category[] = [
    {
      id: 1,
      name: 'test1',
    },
    {
      id: 2,
      name: 'test2',
    },
  ];

  constructor(private router: Router) {}

  addCategory() {}

  saveChangesCategory(category: Category) {
    console.log('сохранить ', category);
  }

  cancelChangesCategory() {
    console.log('отменить');
  }

  openTasks() {
    this.router.navigate(['/tasks']);
  }
}
