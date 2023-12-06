import { Injectable } from '@angular/core';
import { Category, Task, User } from '../config/types';
import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categoriesUser$ = new BehaviorSubject<Category[]>([]);

  constructor(private userService: UserService) {
    this.getCategories();
  }

  createCategory(categoryName: string) {
    const categories: Category[] = JSON.parse(
      localStorage.getItem('categories') ?? '[]'
    );
    const newCategory: Category = {
      id: 0,
      name: categoryName,
      userId: this.userService.getUserId() ?? 0,
    };
    if (categories.length === 0) {
      newCategory.id = 1;
    } else {
      let max = 0;
      categories.forEach((item) => {
        if (max < item.id) {
          max = item.id;
        }
      });
      newCategory.id = max + 1;
    }
    categories.push(newCategory);
    localStorage.setItem('categories', JSON.stringify(categories));
    this.reloadCategories();
  }

  reloadCategories() {
    this.getCategories();
  }

  editCategory(newCategory: Category) {
    const allCategories: Category[] = JSON.parse(
      localStorage.getItem('categories') ?? '[]'
    );
    const index = allCategories.findIndex((item) => item.id === newCategory.id);
    allCategories.splice(index, 1, newCategory);
    localStorage.setItem('categories', JSON.stringify(allCategories));
    this.reloadCategories();
  }

  deleteCategory(id: number) {
    const categories: Category[] = JSON.parse(
      localStorage.getItem('categories') ?? '[]'
    );
    const index = categories.findIndex((item) => item.id === id);
    if (index !== -1) {
      categories.splice(index, 1);
      localStorage.setItem('categories', JSON.stringify(categories));
      this.reloadCategories();
    }
  }

  getCategories(): Category[] {
    const globalCategories: Category[] = JSON.parse(
      localStorage.getItem('categories') ?? '[]'
    );
    const userId = this.userService.getUserId();
    const userCategories: Category[] = globalCategories.filter(
      (item) => item.userId === userId
    );
    this.categoriesUser$.next(userCategories);
    return userCategories;
  }
}
