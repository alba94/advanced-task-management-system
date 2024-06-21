import { UserRole } from '@lib/enums/task';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { usersFeatureKey, UsersFeatureState } from './user.reducer';

const selectUsersFeatureState =
  createFeatureSelector<UsersFeatureState>(usersFeatureKey);

export const selectSystemUsers = createSelector(
  selectUsersFeatureState,
  (state) => state.users,
);

export const selectNotAdminUsers = createSelector(
  selectUsersFeatureState,
  (state) => state.users?.filter((user) => user.role !== UserRole.ADMIN),
);
