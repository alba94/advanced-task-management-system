import { NgIf } from '@angular/common';
import { Directive, inject, Input } from '@angular/core';
import { UserRole } from '@lib/enums/task';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '@store/auth/auth.selectors';
import { map } from 'rxjs';

@Directive({
  selector: '[appIfUserHasRole]',
  standalone: true,
  hostDirectives: [
    {
      directive: NgIf,
      inputs: ['ngIf:appIfUserHasRole'],
    },
  ],
})
export class IfUserHasRoleDirective {
  private readonly _ngIfDirective = inject(NgIf);
  private readonly _store = inject(Store);

  @Input({ alias: 'appIfUserHasRole', required: true })
  set role(userRoles: UserRole[]) {
    this._store.select(selectAuthUser).pipe(
      map((user) => {
        this._ngIfDirective.ngIf = userRoles.some((role) => user?.role === role);
      }),
    ).subscribe();
  }
}
