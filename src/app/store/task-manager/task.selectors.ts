import { StatusEnum, TypeEnum } from '@lib/enums/task';
import { Task } from '@lib/interfaces/task';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskFeatureState, taskFeatureKey } from './task.reducer';

const selectTasksFeatureState =
  createFeatureSelector<TaskFeatureState>(taskFeatureKey);

export const selectTaskList = createSelector(
  selectTasksFeatureState,
  (state) => {
    return state.tasks;
  },
);

export const selectTaskFilters = createSelector(
  selectTasksFeatureState,
  (state) => {
    return state.filters;
  },
);

export const isLoading = createSelector(
  selectTasksFeatureState,
  (state) => state.isLoading,
);

export const selectCommentsOfTask = createSelector(
  selectTasksFeatureState,
  ({ tasks }) => tasks.filter((task) => task.comments),
);

export const selectSearchFilterParams = createSelector(
  selectTaskFilters,
  (state) => state,
);

export const selectFilteredTasks = createSelector(
  selectTaskList,
  selectTaskFilters,
  (tasks, filters) => {
    return tasks.filter((task) => {

      const matchesSearchValue =
        !filters.searchValue ||
        task.title?.toLowerCase()?.includes(filters.searchValue.toLowerCase());
      const matchesStatus = !filters.type.length || filters.type.includes(task.type as TypeEnum);
      const matchesPriority =
        !filters.priority || task.priority === filters.priority;
      // const matchesOnlyMyTasks = !filters.onlyMyTasks || task.assignedTo; // assuming a field `assignedToMe` exists

      return matchesSearchValue && matchesStatus;
    });
  },
);

export const selectTodoTaskCount = createSelector(
  selectTaskList,
  (tasks: Task[]) =>
    tasks.filter((task) => task.status === StatusEnum.TODO).length,
);

export const selectInProgressTaskCount = createSelector(
  selectTaskList,
  (tasks: Task[]) =>
    tasks.filter((task) => task.status === StatusEnum.IN_PROGRESS).length,
);

export const selectDoneTaskCount = createSelector(
  selectTaskList,
  (tasks: Task[]) =>
    tasks.filter((task) => task.status === StatusEnum.DONE).length,
);

export const selectBacklogTaskCount = createSelector(
  selectTaskList,
  (tasks: Task[]) =>
    tasks.filter((task) => task.status === StatusEnum.BACKLOG).length,
);

export const selectSelectedTaskCount = createSelector(
  selectTaskList,
  (tasks: Task[]) =>
    tasks.filter((task) => task.status === StatusEnum.SELECTED).length,
);

export const selectTaskCountsByStatus = createSelector(
  selectTaskList,
  selectTodoTaskCount,
  selectInProgressTaskCount,
  selectDoneTaskCount,
  selectBacklogTaskCount,
  selectSelectedTaskCount,
  (
    totaleCount,
    todoCount,
    inProgressCount,
    doneCount,
    backLogCount,
    selectedCount,
  ) => [
    { status: 'Total tasks', count: totaleCount.length },
    { status: StatusEnum.TODO, count: todoCount },
    { status: StatusEnum.IN_PROGRESS, count: inProgressCount },
    { status: StatusEnum.DONE, count: doneCount },
    { status: StatusEnum.BACKLOG, count: backLogCount },
    { status: StatusEnum.SELECTED, count: selectedCount },
  ],
);

export const selectCurrentUserTasks = createSelector(
  selectTaskList,
  (tasks: Task[]) => tasks.filter((task) => task.assignedTo === 0),
);
