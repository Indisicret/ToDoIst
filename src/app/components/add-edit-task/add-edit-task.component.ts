import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, LOCALE_ID } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Observable } from 'rxjs';
import { MESSAGES, PRIORITIES } from '../../config/constants';
import { generateEditTaskForm } from '../../config/methods';
import { AddTaskForm, Category, Task } from '../../config/types';
import { CategoryService } from '../../services/category.service';
import { TaskService } from '../../services/task.service';
@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [
    CommonModule,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
  ],
  templateUrl: './add-edit-task.component.html',
  providers: [
    TaskService,
    {
      provide: LOCALE_ID,
      useValue: 'ru',
    },
  ],
  styleUrl: './add-edit-task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditTaskComponent {
  editTaskForm: FormGroup<AddTaskForm>;
  optionsPriority = PRIORITIES;
  optionsCategory$: Observable<Category[]> =
    this.categoryService.categoriesUser$;

  private task: Task | null;

  constructor(
    private taskService: TaskService,
    private dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private categoryService: CategoryService
  ) {
    this.task = this.config.data.task;
    this.editTaskForm = generateEditTaskForm(this.task ?? undefined);
  }

  saveEditTask() {
    if (this.task) {
      const newTask: Task = {
        ...(this.editTaskForm.getRawValue() as Task),
        userId: this.task.userId,
        id: this.task.id,
        done: this.task.done,
      };
      this.taskService.editTask(newTask);
      this.dialogRef.close(MESSAGES.edit);
    } else {
      const task = this.editTaskForm.getRawValue() as unknown as Task;
      task.done = false;
      this.taskService.addTask(task);
      this.dialogRef.close(MESSAGES.add);
    }
  }
}
