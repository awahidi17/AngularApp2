import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dueDateLabel',
  standalone: true,
})
export class DueDateLabelPipe implements PipeTransform {
  transform(value?: string, locale: string = navigator.language): string {
    if (!value) {
      return 'No due date';
    }

    const dueDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    const label = dueDate.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    if (dueDate.getTime() < today.getTime()) {
      return `Overdue • ${label}`;
    }

    if (dueDate.getTime() === today.getTime()) {
      return `Due today • ${label}`;
    }

    return `Due • ${label}`;
  }
}
