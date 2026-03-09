import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';

import { TaskService } from '../../services/task';
import { Task } from '../../models/task-model';
import { TaskItem } from '../task-item/task-item';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskItem],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskListComponent {
  filter: 'all' | 'active' | 'completed' | 'overdue' = 'all';
  filteredTasks$: Observable<Task[]>;

  constructor(private taskService: TaskService) {
    this.filteredTasks$ = this.taskService.tasks$;
  }

  applyFilter(): void {
    this.filteredTasks$ = this.taskService.tasks$.pipe(
      map((tasks) => {
        switch (this.filter) {
          case 'active':
            return tasks.filter((task) => !task.completed);
          case 'completed':
            return tasks.filter((task) => task.completed);
          case 'overdue': {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return tasks.filter((task) => !!task.dueDate && new Date(task.dueDate) < today && !task.completed);
          }
          default:
            return tasks;
        }
      }),
    );
  }

  toggle(id: string): void {
    this.taskService.toggleCompleted(id);
  }

  remove(id: string): void {
    this.taskService.remove(id);
  }

  clearCompleted(): void {
    this.taskService.clearCompleted();
  }

  trackById = (_: number, task: Task): string => task.id;
}
