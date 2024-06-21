import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CardComponent } from '@lib/components/shared/card/card.component';
import { AuthService } from '@lib/services/auth.service';
import { Store } from '@ngrx/store';
import { TaskActions } from '@store/task-manager/task.actions';
import { selectTaskCountsByStatus, selectTaskList } from '@store/task-manager/task.selectors';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardComponent, CommonModule, MatTableModule, FullCalendarModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private readonly _store = inject(Store);
  private readonly _authService = inject(AuthService);

  selectTaskCountsByStatus$ = this._store.select(selectTaskCountsByStatus);
  currentUser$ = this._authService.getCurrentUser();
  taskList$ = this._store.select(selectTaskList);
  displayedColumns: string[] = ['title', 'priority', 'type'];
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
  };

  ngOnInit(): void {
    this._store.dispatch(TaskActions.loadTasks());
  }

  currentUserTasks$ = combineLatest([this.taskList$, this.currentUser$]).pipe(
    map(([tasks, user]) => {
      return tasks.filter((task) => task.assignedTo?.toString() == user.id);
    }),
  );

  currentUserTasksForCalendar$ = this.currentUserTasks$.pipe(
    map((tasks) =>
      tasks.map((task) => {
        return {
          title: task.title as string,
          start: new Date(task.startDate as string),
          end: new Date(task.dueDate as string),
        };
      }),
    ),
  );
}
