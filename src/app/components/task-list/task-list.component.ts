import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule }  from 'primeng/table';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TableModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {

}
