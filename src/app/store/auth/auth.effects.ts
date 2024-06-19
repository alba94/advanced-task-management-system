import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@lib/services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  private readonly _actions$ = inject(Actions);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  login$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action) => {
        return this._authService.login(action.user).pipe(
          map((response) => {
            this._router.navigate(['/boards']);
            return AuthActions.loginSuccess({ user: response });
          }),
        );
      }),
    );
  });

  logout$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(AuthActions.logout),
        switchMap(() => this._authService.logout().pipe(
          map(() => {
            this._router.navigate(['/']);
            return AuthActions.logoutSuccess();
          })
        )),
      );
    },
    { dispatch: false },
  );
}
