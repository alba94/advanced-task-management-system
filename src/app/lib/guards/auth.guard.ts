import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { UserRole } from '@lib/enums/task';
import { AuthService } from '@lib/services/auth.service';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '@store/auth/auth.selectors';
import { map, take } from 'rxjs';

export namespace AuthGuard {
  export const canActivate = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) => {
    const _authService = inject(AuthService);
    const _router = inject(Router);

    return _authService.getCurrentUser().pipe(
      take(1),
      map((currentUser) => {
        if (currentUser !== undefined) {
          return true;
        } else {
          _router.navigate(['/login']);
          return false;
        }
      }),
    );
  };

  export const canActivateChild = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) => {
    const expectedRoles = route.data['roles'] as string[];
    const _authService = inject(AuthService);
    const _router = inject(Router);

    return _authService.getCurrentUser().pipe(
      take(1),
      map((currentUser) => {
        if (currentUser !== undefined) {
          if (expectedRoles.some((role) => currentUser.role === role)) {
            return true;
          } else {
            _router.navigate(['/unauthorized']);
            return false;
          }
        } else {
          _router.navigate(['/login']);
          return false;
        }
      }),
    );
  };

  export const canLoad = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) => {
    const _store = inject(Store);

    return _store.select(selectAuthUser).pipe(
      map((user) => {
        return user?.role && user.role === UserRole.ADMIN;
      }),
    );
  };
}
