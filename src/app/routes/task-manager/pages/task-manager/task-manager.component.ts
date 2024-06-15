import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DragDropComponent } from '@lib/components/shared/drag-drop/drag-drop.component';

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [MatTabsModule, DragDropComponent],
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.css',
})
export class TaskManagerComponent {}
