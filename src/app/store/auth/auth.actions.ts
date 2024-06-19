import { LoginRequest } from '@lib/interfaces/auth';
import { User, UserRS } from '@lib/interfaces/user';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    Login: props<{ user: LoginRequest; isLoading: true }>(),
    'Login success': props<{ user: UserRS[] }>(),
    'Login failure': props<{ error: string }>(),
    Logout: emptyProps(),
    'Logout success': emptyProps(),
    'Load users': props<{ users: UserRS[] }>(),
  },
});
