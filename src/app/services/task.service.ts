import { Injectable } from '@angular/core';
import { Task } from '../config/types';
import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  
  tasksUser$ = new BehaviorSubject<Task[]>([]);

  constructor(private userService: UserService) {
    this.getTask();
  }

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

  editTask(newTask: Task) {
    const allTasks: Task[] = JSON.parse(localStorage.getItem('tasks') ?? '[]');
    const index = allTasks.findIndex((item) => item.id === newTask.id);
    allTasks.splice(index, 1, newTask);
    localStorage.setItem('tasks', JSON.stringify(allTasks));
  }

  deleteTask(id: number) {
    const allTasks: Task[] = JSON.parse(localStorage.getItem('tasks') ?? '[]');
    const index = allTasks.findIndex((item) => item.id === id);
    if (index !== -1) {
      allTasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(allTasks));
    }
    this.getTask();
  }

  reloadTasks(): void {
    this.getTask();
  }

  private getTask() {
    const globalTasks: Task[] = JSON.parse(
      localStorage.getItem('tasks') ?? '[]'
    );
    const userId = this.userService.getUserId();
    const userTasks: Task[] = globalTasks.filter(
      (item) => item.userId === userId
    );
    this.tasksUser$.next(userTasks);
  }
}
