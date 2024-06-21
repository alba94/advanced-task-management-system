import { TypeEnum } from '@lib/enums/task';
import { Task } from '@lib/interfaces/task';
import { createReducer, on } from '@ngrx/store';
import { TaskActions } from './task.actions';

export const taskFeatureKey = 'tasks';

export interface FilterState {
  searchValue: string;
  type: TypeEnum[];
}

export interface TaskFeatureState {
  isLoading: boolean;
  tasks: Task[];
  error: string | null;
  filters: FilterState;
}

const initialState: TaskFeatureState = {
  isLoading: false,
  tasks: [],
  error: null,
  filters: {
    searchValue: '',
    type: [],
  },
};

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasks, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(TaskActions.loadTasksSuccess, (state, payload) => ({
    ...state,
    tasks: payload.tasks,
    isLoading: false,
  })),
  on(TaskActions.createTask, (state, payload) => ({
    ...state,
    isLoading: true,
  })),
  on(TaskActions.createTaskSuccess, (state, payload) => ({
    ...state,
    tasks: [...state.tasks, payload.task],
    isLoading: false,
  })),
  on(TaskActions.updateTask, (state, payload) => ({
    ...state,
    tasks: state.tasks.map((task) =>
      task.id === payload.task.id ? { ...task, ...payload.task } : task,
    ),
  })),
  on(TaskActions.deleteTaskSuccess, (state, payload) => ({
    ...state,
    tasks: [...state.tasks.filter((task) => task.id !== payload.id)],
    isLoading: false,
  })),
  on(TaskActions.updateTaskStatus, (state, payload) => ({
    ...state,
    tasks: state.tasks.map((task) => {
      if (task.id === payload.id) {
        return {
          ...task,
          status: payload.status,
        };
      }
      return task;
    }),
  })),
  on(TaskActions.addComment, (state, payload) => ({
    ...state,
    tasks: state.tasks.map((task) => {
      if (task.id === payload.id) {
        return {
          ...task,
          comments: [...(task.comments as []), payload.comment],
        };
      }
      return task;
    }),
  })),
  on(TaskActions.setSearchAndFiltersParams, (state, { filters }) => ({
    ...state,
    filters: { ...state.filters, ...filters },
  })),
  on(TaskActions.resetFilters, (state) => ({
    ...state,
    filters: { ...initialState.filters },
  })),
);
