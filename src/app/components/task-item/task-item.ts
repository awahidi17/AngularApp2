import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task-model';
import { TaskStatusDirective } from '../../directives/task-status';
import { DueDateLabelPipe } from '../../pipes/due-date-label-pipe';
import { TruncatePipe } from '../../pipes/truncate-pipe';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, DueDateLabelPipe, TruncatePipe, TaskStatusDirective],
  templateUrl: './task-item.html',
  styleUrls: ['./task-item.scss'],
})
export class TaskItem {
  @Input({ required: true }) task!: Task;
  @Output() toggle = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();
}
