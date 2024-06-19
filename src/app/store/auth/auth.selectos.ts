import { UserRole } from '@lib/enums/task';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthFeatureState, authFeatureKey } from './auth.reducer';

const selectAuthFeatureState =
  createFeatureSelector<AuthFeatureState>(authFeatureKey);

export const selectAuthError = createSelector(
  selectAuthFeatureState,
  (state) => state.error,
);

export const selectAuthUser = createSelector(
  selectAuthFeatureState,
  (state) => state.user,
);

export const selectAuthisLoading = createSelector(
  selectAuthFeatureState,
  (state) => state.isLoading,
);
