import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { Priority } from '../models/task-model';

@Directive({
  selector: '[appTaskStatus]',
  standalone: true,
})
export class TaskStatusDirective implements OnChanges {
  @Input('appTaskStatusCompleted') completed = false;
  @Input('appTaskStatusPriority') priority: Priority = 'low';

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnChanges(_: SimpleChanges): void {
    const card = this.el.nativeElement;

    this.renderer.setStyle(card, 'opacity', this.completed ? '0.72' : '1');
    this.renderer.setStyle(card, 'transform', this.completed ? 'scale(0.99)' : 'scale(1)');
    this.renderer.setStyle(card, 'border-left', `5px solid ${this.priorityColor(this.priority)}`);

    const title = card.querySelector('.task-title span');
    if (title) {
      this.renderer.setStyle(title, 'textDecoration', this.completed ? 'line-through' : 'none');
      this.renderer.setStyle(title, 'color', this.completed ? '#94a3b8' : '#e5eefb');
    }
  }

  private priorityColor(priority: Priority): string {
    switch (priority) {
      case 'high':
        return '#fb7185';
      case 'medium':
        return '#f59e0b';
      default:
        return '#22c55e';
    }
  }
}
