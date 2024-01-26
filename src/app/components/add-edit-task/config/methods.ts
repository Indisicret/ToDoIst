import { FormGroup } from '@angular/forms';
import { AddTaskForm, Task } from '../../../config/types';

export const generateNewTask = (
  form: FormGroup<AddTaskForm>,
  task?: Task
): Task => {
  const formValue = form.getRawValue();
  const newTask: Task = {
    name: formValue.name ?? '',
    category: formValue.category ?? '',
    deadLineDate: formValue.deadLineDate?.toString() ?? '',
    description: formValue.description ?? '',
    priority: formValue.priority ?? '',
    userId: task ? task.userId : 0,
    id: task ? task.id : 0,
    done: task ? task.done : false,
  };

  return newTask;
};
