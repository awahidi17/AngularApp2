import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Priority } from '../../models/task-model';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.scss'],
})
export class TaskFormComponent {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    description: [''],
    dueDate: [''],
    priority: ['low' as Priority],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const task = this.form.getRawValue();
    this.taskService.add({
      title: task.title ?? '',
      description: task.description || undefined,
      dueDate: task.dueDate || undefined,
      priority: task.priority ?? 'low',
    });

    this.clearForm();
  }

  clearForm(): void {
    this.form.reset({
      title: '',
      description: '',
      dueDate: '',
      priority: 'low',
    });
  }
}
