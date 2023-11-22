import { Injectable } from '@angular/core';
import { Task, User } from '../config/types';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
    taskId: number | null = null;
  constructor() {}

addTask(task:Task){
    const globalTask: Task[]= JSON.parse(localStorage.getItem('tasks') ?? '[]')
    globalTask.push(task);
    localStorage.setItem('tasks', JSON.stringify(globalTask));
   
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
        this.taskId = task.id;
      }
      globalTask.push(task);
      localStorage.setItem('tasks', JSON.stringify(globalTask));
      console.log(localStorage.getItem('tasks'))

}

readTask(){}

editTask(){}

deleteTask(){}



}