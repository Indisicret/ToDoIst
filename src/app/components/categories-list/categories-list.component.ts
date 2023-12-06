import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Observable } from 'rxjs';
import { MESSAGESCATEGORIES } from '../../config/constants';
import { AddCategoryForm, Category } from '../../config/types';
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
    ConfirmDialogModule,
    ToastModule,
  ],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss',
  providers: [CategoryService, ConfirmationService, MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesListComponent {
  addCategoryform: FormGroup<AddCategoryForm>;

  categoriesTable$: Observable<Category[]> =
    this.categoryService.categoriesUser$;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private confimationService: ConfirmationService,
    private messageServis: MessageService
  ) {
    this.addCategoryform = new FormGroup<AddCategoryForm>({
      name: new FormControl<string | null>(null, [Validators.required]),
    });
  }

  addCategory() {
    const newCategory = this.addCategoryform.getRawValue();
    this.categoryService.createCategory(newCategory.name ?? '');
    this.addCategoryform = new FormGroup<AddCategoryForm>({
      name: new FormControl<string | null>(null, [Validators.required]),
    });
  }

  clickDeleteIcon(id: number) {
    this.confimationService.confirm({
      message: 'Вы уверены, что хотите удалить эту категорию?',
      header: 'Удаление категории',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.categoryService.deleteCategory(id);
        this.messageServis.add(MESSAGESCATEGORIES.delete);
      },
    });
  }

  saveChangesCategory(category: Category) {
    this.categoryService.editCategory(category);
  }

  cancelChangesCategory() {
    this.categoryService.reloadCategories();
  }

  openTasks() {
    this.router.navigate(['/tasks']);
  }
}
