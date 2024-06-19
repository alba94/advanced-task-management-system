import { StatusEnum } from '@lib/enums/task';
import { FilterParams, Task, TaskComment } from '@lib/interfaces/task';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { FilterState } from './task.reducer';

export const TaskActions = createActionGroup({
  source: 'Tasks',
  events: {
    'Load tasks': props<{ isLoading: true }>,
    'Load tasks success': props<{ tasks: Task[] }>(),
    'Load tasks failure': props<{ error: string }>(),

    'Create task': props<{ task: Task }>(),
    'Create task success': props<{ task: Task }>(),
    'Create task failure': props<{ error: string }>(),

    'Update task': props<{ task: Task }>(),
    'Update task success': props<{ task: Task }>(),
    'Update task failure': props<{ error: string }>(),

    'Delete task': props<{ id: number }>(),
    'Delete task success': emptyProps(),
    'Delete task failure': props<{ error: string }>(),

    'Add comment': props<{ comment: TaskComment }>(),
    'Add comment success': props<{ comment: TaskComment }>(),
    'Add comment failure': props<{ error: string }>(),

    'Add attachment': props<{ attachment: any }>(),

    'Update task status': props<{ id: number; status: StatusEnum }>(),

    'Set search params': props<{ searchParam: string }>(),
    'Set filters params': props<{ filters: FilterParams }>(),
    'Set search and filters params': props<{
      filters: Partial<FilterState>;
    }>(),
    'Submit filters': props<{ searchParams: number }>(),
    'Reset filters': emptyProps(),
    'Refresh filters': emptyProps(),
  },
});
