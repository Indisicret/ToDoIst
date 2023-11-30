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
import { CategoryService } from '../../services/category.service';

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
  providers: [CategoryService],
})
export class CategoriesListComponent {
  addCategoryform: FormGroup<AddCategoryForm>;
  categoriesTable: Category[] = [];

  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.addCategoryform = new FormGroup<AddCategoryForm>({
      name: new FormControl<string | null>(null, [Validators.required]),
    });

    this.categoriesTable = this.categoryService.getCategories();
  }

  addCategory() {
    const newCategory = this.addCategoryform.getRawValue();
    this.categoryService.createCategory(newCategory.name ?? '');
    this.categoriesTable = this.categoryService.getCategories();
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
