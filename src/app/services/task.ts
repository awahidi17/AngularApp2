import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Priority, Task } from '../models/task-model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly seedTasks: Task[] = [
    {
      id: 'demo-1',
      title: 'Review Angular directives',
      description: 'Check how the custom task status directive changes the look of each task card.',
      dueDate: this.offsetDate(1),
      priority: 'high',
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'demo-2',
      title: 'Update assignment notes',
      description: 'Add short notes about pipes, observables, and the shared task service.',
      dueDate: this.offsetDate(2),
      priority: 'medium',
      completed: false,
      createdAt: new Date().toISOString(),
    },
  ];

  private readonly tasksSubject = new BehaviorSubject<Task[]>(this.seedTasks);
  readonly tasks$ = this.tasksSubject.asObservable();

  readonly stats$ = this.tasks$.pipe(
    map((tasks) => {
      const total = tasks.length;
      const completed = tasks.filter((task) => task.completed).length;
      const active = total - completed;
      const overdue = tasks.filter((task) => this.isOverdue(task.dueDate) && !task.completed).length;
      return { total, completed, active, overdue };
    }),
  );

  add(task: { title: string; description?: string; dueDate?: string; priority: Priority }): void {
    const now = new Date().toISOString();
    const newTask: Task = {
      id: this.generateId(),
      title: task.title.trim(),
      description: task.description?.trim(),
      dueDate: task.dueDate?.trim() || undefined,
      priority: task.priority,
      completed: false,
      createdAt: now,
    };

    this.tasksSubject.next([...this.tasksSubject.value, newTask]);
  }

  toggleCompleted(id: string): void {
    const next = this.tasksSubject.value.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );
    this.tasksSubject.next(next);
  }

  update(id: string, patch: Partial<Omit<Task, 'id' | 'createdAt'>>): void {
    const next = this.tasksSubject.value.map((task) =>
      task.id === id ? { ...task, ...patch } : task,
    );
    this.tasksSubject.next(next);
  }

  remove(id: string): void {
    this.tasksSubject.next(this.tasksSubject.value.filter((task) => task.id !== id));
  }

  clearCompleted(): void {
    this.tasksSubject.next(this.tasksSubject.value.filter((task) => !task.completed));
  }

  private isOverdue(dueDate?: string): boolean {
    if (!dueDate) {
      return false;
    }

    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return due.getTime() < today.getTime();
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  private offsetDate(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  }
}
