import { ActionReducerMap } from '@ngrx/store';
import { authFeatureKey, AuthFeatureState, authReducer } from './auth/auth.reducer';
import { taskFeatureKey, TaskFeatureState, taskReducer } from './task-manager/task.reducer';
import { userReducer, usersFeatureKey, UsersFeatureState } from './user/user.reducer';

export interface AppState {
  readonly [taskFeatureKey]: TaskFeatureState;
  readonly [authFeatureKey]: AuthFeatureState;
  readonly [usersFeatureKey]: UsersFeatureState;
}

export const reducers: ActionReducerMap<AppState> = {
  [taskFeatureKey]: taskReducer,
  [authFeatureKey]: authReducer,
  [usersFeatureKey]: userReducer,
};
