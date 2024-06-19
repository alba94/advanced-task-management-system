import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserRole } from '@lib/enums/task';
import { UserRS } from '@lib/interfaces/user';
import { AuthService } from '@lib/services/auth.service';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '@store/auth/auth.selectos';
import { map } from 'rxjs';

export namespace AuthGuard {
  export const canActivate = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) => {
    const expectedRoles = route.data['roles'] as string[];
    const _authService = inject(AuthService);
    const _router = inject(Router);

    return _authService.getCurrentUser().pipe(
      map((currentUser) => {
        if (!currentUser) {
          _router.navigate(['/login']);
          return false;
        }
        if (expectedRoles.some((role) => role === currentUser.role)) {
          return true;
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
