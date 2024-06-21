import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { BoardFiltersComponent } from '@lib/components/shared/board-filters/board-filters.component';
import { Task } from '@lib/interfaces/task';
import { TaskFormComponent } from '@routes/task-manager/components/task-form/task-form.component';
import { DragDropComponent } from '@routes/task-manager/pages/drag-drop/drag-drop.component';

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
      width: '1000px',
      height: 'auto',
      data: task,
    });
  }
}
