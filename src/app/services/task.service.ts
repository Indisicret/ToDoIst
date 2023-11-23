import { Injectable } from '@angular/core';
import { Category, Task, User } from '../config/types';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private userService: UserService) {}

  addTask(task: Task) {
    const globalTask: Task[] = JSON.parse(
      localStorage.getItem('tasks') ?? '[]'
    );
    if (globalTask.length === 0) {
      task.id = 1;
    } else {
      let max = 0;
      globalTask.forEach((item) => {
        if (item.id && max < item.id) {
          max = item.id;
        }
      });
      task.id = max + 1;
    }
    const userId = this.userService.getUserId();
    if (userId) {
      task.userId = userId;
    }
    globalTask.push(task);

    console.log(globalTask);
    localStorage.setItem('tasks', JSON.stringify(globalTask));
  }

  getTask(): Task[] {
    const globalTasks: Task[] = JSON.parse(
      localStorage.getItem('tasks') ?? '[]'
    );
    const userId = this.userService.getUserId();
    const userTasks: Task[] = globalTasks.filter(
      (item) => item.userId === userId
    );
    return userTasks;
  }

  createCategory(categoryName: string) {
    const categories: Category[] = JSON.parse(
      localStorage.getItem('categories') ?? '[]'
    );
    const newCategory: Category = {
      id: 0,
      name: categoryName,
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

  editTask() {}

  deleteTask(id: number) {
    localStorage.removeItem('tasks');
    const allTask: Task[] = JSON.parse(localStorage.getItem('tasks') ?? '[]');
    const index = allTask.findIndex((item) => item.id === id);
    if (index !== -1) {
      allTask.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(allTask));
    }
  }
}
