import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-stats-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-panel.html',
  styleUrls: ['./stats-panel.scss']
})
export class StatsPanel implements OnInit, OnDestroy {
  stats = { total: 0, active: 0, completed: 0, overdue: 0 };
  private destroy$ = new Subject<void>();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.stats$
      .pipe(takeUntil(this.destroy$))
      .subscribe(stats => this.stats = stats);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
