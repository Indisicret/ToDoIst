import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AddCategoryForm, Category } from '../../config/types';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
  addCategoryform: FormGroup<AddCategoryForm>;
  categoriesTable: Category[] = [
   
  ];

  constructor(private router: Router) {
    this.addCategoryform = new FormGroup<AddCategoryForm>({
      name: new FormControl<string | null>(null, [Validators.required]),
    });
  }

  addCategory() {
    const newCategory = this.addCategoryform.getRawValue();

    // this.categoriesTable.push({
    //   name: newCategory.name ?? '',
    //   id: this.categoriesTable.length + 1,
    // });
    this.addCategoryform = new FormGroup<AddCategoryForm>({
      name: new FormControl<string | null>(null, [Validators.required]),
    });
  }

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
