import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { statusDisplay } from '@lib/constants/task.const';
import { StatusEnum } from '@lib/enums/task';
import { Task } from '@lib/interfaces/task';
import { select, Store } from '@ngrx/store';
import { TaskActions } from '@store/task-manager/task.actions';
import { selectFilteredTasks } from '@store/task-manager/task.selectors';
import { UserActions } from '@store/user/user.actions';
import { map, Observable } from 'rxjs';
import { CardGroupComponent } from '../card-group/card-group.component';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-drag-drop',
  standalone: true,
  imports: [
    CommonModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    CardComponent,
    CardGroupComponent,
    MatIcon,
    MatButtonModule,
  ],
  templateUrl: './drag-drop.component.html',
  styleUrl: './drag-drop.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragDropComponent implements OnInit, OnDestroy {
  private readonly _store = inject(Store);
  @Input() tasks: Task[] = [];
  @Output() emitSelectedData: EventEmitter<Task | null> = new EventEmitter();
  intervalId: any;
  _statusEnum = StatusEnum;
  _statusDisplay = statusDisplay;
  statuses = [
    StatusEnum.BACKLOG,
    StatusEnum.TODO,
    StatusEnum.IN_PROGRESS,
    StatusEnum.DONE,
  ];

  filteredTasks$: Observable<Task[]> = this._store.pipe(
    select(selectFilteredTasks),
  );

  ngOnInit(): void {
    this._store.dispatch(TaskActions.loadTasks());
    this._store.dispatch(UserActions.loadUsers());

    // this.intervalId = setInterval(() => {
    //   let randomTaskId = Math.floor(100000 + Math.random() * 900000);
    //   let randomPriority = Math.floor(Math.random() * 3);
    //   let randomStatus = Math.floor(Math.random() * 5);

    //   const newRandomTask: Task = {
    //     id: randomTaskId,
    //     title: `Random Task ${randomTaskId}`,
    //     description: `Random Description ${randomTaskId}`,
    //     status: <StatusEnum>Object.values(StatusEnum)[randomStatus],
    //     priority: <PriorityEnum>Object.values(PriorityEnum)[randomPriority],
    //   };
    //   this._store.dispatch(TaskActions.createTask({ task: newRandomTask }));
    // }, 5000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  taskByStatusSorted$ = (status: StatusEnum): Observable<Task[]> =>
    this.filteredTasks$.pipe(
      map((filteredTasks) => {
        return filteredTasks.filter((task) => task.status === status);
      }),
    );

  drop(event: CdkDragDrop<Task[]>, status: StatusEnum): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const droppedTask = event.container.data[event.currentIndex];
      this._store.dispatch(
        TaskActions.updateTaskStatus({
          id: droppedTask.id ?? '',
          status,
        }),
      );
      // setInterval(() => {
      //   this._store.dispatch(TaskActions.loadTasks());
      // }, 5000);
    }
  }

  emitData(task: Task | null): void {
    this.emitSelectedData.emit(task);
  }
}
