import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { BoardFiltersComponent } from '@lib/components/shared/board-filters/board-filters.component';
import { DragDropComponent } from '@lib/components/shared/drag-drop/drag-drop.component';
import { Task } from '@lib/interfaces/task';
import { TaskFormComponent } from '@routes/task-manager/components/task-form/task-form.component';

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [
    MatTabsModule,
    CommonModule,
    DragDropComponent,
    BoardFiltersComponent,
  ],
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.css',
})
export class TaskManagerComponent {
  public readonly dialog = inject(MatDialog);

  openTaskModal(task: Task | null): void {
    this.dialog.open(TaskFormComponent, {
      width: '950px',
      data: task,
    });
  }
}
