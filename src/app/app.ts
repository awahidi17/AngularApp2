import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskFormComponent } from './components/task-form/task-form';
import { TaskListComponent } from './components/task-list/task-list';
import { StatsPanel } from './components/stats-panel/stats-panel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TaskFormComponent, TaskListComponent, StatsPanel],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
