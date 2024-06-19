import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AuthEffects } from './auth/auth.effects';
import { reducers } from './reducers';
import { TaskEffects } from './task-manager/task.effects';
import { UserEffects } from './user/user.effects';

export const APP_STORE_PROVIDERS = [
  provideStore(reducers, {}),
  provideEffects([TaskEffects, AuthEffects, UserEffects]),
  provideStoreDevtools({
    maxAge: 25,
  }),
];
