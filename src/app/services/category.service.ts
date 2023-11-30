import { Injectable } from '@angular/core';
import { Category, Task, User } from '../config/types';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private userService: UserService) {}

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
  }

  getCategories(): Category[] {
    const globalCategories: Category[] = JSON.parse(
      localStorage.getItem('category') ?? '[]'
    );
    const userId = this.userService.getUserId();
    const userCategories: Category[] = globalCategories.filter(
      (item) => item.userId === userId
    );
    return userCategories;
  }

  deleteCategory(id: number) {
    // localStorage.removeItem('categories');
    const categories: Category[] = JSON.parse(
      localStorage.getItem('categories') ?? '[]'
    );
    const index = categories.findIndex((item) => item.id === id);
    if (index !== -1) {
      categories.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(categories));
    }
  }
}
