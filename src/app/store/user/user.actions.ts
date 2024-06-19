import { UserRS } from '@lib/interfaces/user';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load users': emptyProps(),
    'Load users success': props<{ users: UserRS[] }>(),
  },
});
