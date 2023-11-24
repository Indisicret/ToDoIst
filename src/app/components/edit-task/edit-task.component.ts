import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>edit-task works!</p>`,
  styleUrl: './edit-task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTaskComponent { }
