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
import { MESSAGES, MESSAGESCATEGORIES } from '../../config/constants';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

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
    ConfirmDialogModule,
    ToastModule,

  ],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss',
  providers: [CategoryService,ConfirmationService, MessageService,],
})
export class CategoriesListComponent {
  addCategoryform: FormGroup<AddCategoryForm>;
  categoriesTable: Category[] = [];

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private confimationService: ConfirmationService,
    private messageServis: MessageService,
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
  clickDeleteIcon(id: number) {
    console.log(id)
    this.confimationService.confirm({
      message: 'Вы уверены, что хотите удалить эту категорию?',
      header: 'Удаление категории',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.categoryService.deleteCategory(id)
        this.categoriesTable = this.categoryService.getCategories();
        this.messageServis.add(MESSAGESCATEGORIES.delete);
      },
    });
  }

  saveChangesCategory(category: Category) {
    // console.log('сохранить ', category);
    this.categoryService.editCategory(category)
  }

  cancelChangesCategory() {
    this.categoriesTable = this.categoryService.getCategories();
    
  }

  openTasks() {
    this.router.navigate(['/tasks']);
  }
}
