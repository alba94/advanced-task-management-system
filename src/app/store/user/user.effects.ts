import { Injectable, inject } from '@angular/core';
import { UserRole } from '@lib/enums/task';
import { UserService } from '@lib/services/user.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { UserActions } from './user.actions';

@Injectable()
export class UserEffects {
  private readonly _actions$ = inject(Actions);
  private readonly _userService = inject(UserService);

  loadUsers$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(() => {
        return this._userService.getUsers().pipe(
          map((response) => {
            const users = response.filter(
              (user) => user.role !== UserRole.ADMIN,
            );
            return UserActions.loadUsersSuccess({ users: users });
          }),
        );
      }),
    );
  });
}
