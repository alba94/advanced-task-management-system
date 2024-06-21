import { StatusEnum } from '@lib/enums/task';
import { Task, TaskComment } from '@lib/interfaces/task';
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

    'Delete task': props<{ id: string }>(),
    'Delete task success': props<{ id: string }>(),
    'Delete task failure': props<{ error: string }>(),

    'Update task status': props<{ id: string; status: StatusEnum }>(),

    'Add comment': props<{ id: string; comment: TaskComment }>(),
    'Add comment success': props<{ task: Task }>(),
    'Add comment failure': props<{ error: string }>(),

    'Add attachment': props<{ attachment: any }>(),
    'Set search and filters params': props<{
      filters: Partial<FilterState>;
    }>(),
    'Reset filters': emptyProps(),
  },
});
