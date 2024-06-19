import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Task } from '@lib/interfaces/task';
import { TaskService } from '@lib/services/task.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DeleteTaskDialogComponent } from '@routes/task-manager/components/delete-task-dialog/delete-task-dialog.component';
import { map, of, switchMap, tap } from 'rxjs';
import { TaskActions } from './task.actions';

@Injectable()
export class TaskEffects {
  private readonly _actions$ = inject(Actions);
  private readonly _taskService = inject(TaskService);
  public readonly _dialog = inject(MatDialog);

  getTasks$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(TaskActions.loadTasks),
      switchMap(() => {
        return this._taskService
          .getTasks()
          .pipe(map((tasks) => TaskActions.loadTasksSuccess({ tasks })));
      }),
    );
  });

  createTask$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TaskActions.createTask),
      switchMap((action) =>
        this._taskService
          .createTask(action.task)
          .pipe(map((task: Task) => TaskActions.createTaskSuccess({ task }))),
      ),
    ),
  );

  updateTask$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TaskActions.updateTask),
      switchMap((action) =>
        this._taskService
          .updateTask(action.task)
          .pipe(map((task: Task) => TaskActions.updateTaskSuccess({ task }))),
      ),
    ),
  );

  updateTaskStatus$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TaskActions.updateTaskStatus),
      switchMap((action) =>
        this._taskService
          .updateTaskStatus(action.id, action.status)
          .pipe(map((task: Task) => TaskActions.updateTaskSuccess({ task }))),
      ),
    ),
  );

  openDialog$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(TaskActions.deleteTask),
        switchMap((payload) => {
          const dialogRef: MatDialogRef<DeleteTaskDialogComponent> =
            this._dialog.open(DeleteTaskDialogComponent, {
              width: '75vm',
            });

          return dialogRef.afterClosed().pipe(
            switchMap((result) => {
              if (result) {
                return this._taskService
                  .deleteTask(Number(payload.id))
                  .pipe(tap(() => TaskActions.deleteTask({ id: payload.id })));
              } else {
                return of(null);
              }
            }),
          );
        }),
      ),
    { dispatch: false },
  );

  submitFilters$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TaskActions.submitFilters),
      map(() => TaskActions.resetFilters()),
    ),
  );
}
