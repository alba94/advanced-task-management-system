import { UserRS } from '@lib/interfaces/user';
import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { UserRole } from '@lib/enums/task';

export const authFeatureKey = 'auth';

export interface AuthFeatureState {
  isLoading: boolean;
  error: string | null;
  user: UserRS | null;
}

const initialState: AuthFeatureState = {
  isLoading: false,
  error: null,
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(AuthActions.loginSuccess, (state, payload) => ({
    ...state,
    user: payload.user[0],
    error: null,
    isLoading: false,
  })),
  on(AuthActions.loginFailure, (state, payload) => ({
    ...state,
    error: payload.error,
    isLoading: false,
  })),
  on(AuthActions.logout, (state) => ({
    ...initialState,
  })),
  on(AuthActions.loadUsers, (state, payload) => ({
    ...state,
    users: payload.users.filter(user => user.role === UserRole.USER),
    isLoading: false,
  })),
);
