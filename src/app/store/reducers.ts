import { ActionReducerMap } from '@ngrx/store';
import {
  AuthFeatureState,
  authFeatureKey,
  authReducer,
} from './auth/auth.reducer';
import {
  TaskFeatureState,
  taskFeatureKey,
  taskReducer,
} from './task-manager/task.reducer';
import {
  UsersFeatureState,
  userReducer,
  usersFeatureKey,
} from './user/user.reducer';

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
