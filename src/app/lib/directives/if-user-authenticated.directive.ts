import { NgIf } from '@angular/common';
import { Directive, inject, Input } from '@angular/core';
import { UserRole } from '@lib/enums/task';

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

  @Input({ alias: 'appIfUserHasRole', required: true })
  set role(userRoles: UserRole[]) {
    const storedUserAuth = localStorage.getItem('auth-user');
    let user: any = null;

    if (storedUserAuth !== null) {
      user = JSON.parse(storedUserAuth);
    }

    if (user && user.role) {
      this._ngIfDirective.ngIf = userRoles.some((role) => user.role === role);
    }
  }
}
