import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginRequest } from '@lib/interfaces/auth';
import { UserRS } from '@lib/interfaces/user';
import { Store } from '@ngrx/store';
import { AuthActions } from '@store/auth/auth.actions';
import { Observable, map, of, startWith, switchMap, tap } from 'rxjs';
import { environment } from 'src/app/environment';
import { IndexeddbService } from './indexeddb.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _indexeddbService = inject(IndexeddbService);
  private readonly _store = inject(Store);
  private _baseUrl = `${environment.baseUrl}/users`;

  login(request: LoginRequest): Observable<UserRS[]> {
    return this._httpClient
      .get<
        UserRS[]
      >(`${this._baseUrl}?email=${request.email}&password=${request.password}`)
      .pipe(
        tap((response) => {
          if (response && response.length) {
            this._indexeddbService.setUser(
              'auth-user',
              JSON.stringify(response[0]),
            );
          } else {
            this._store.dispatch(
              AuthActions.loginFailure({ error: 'User does not exist' }),
            );
          }
        }),
      );
  }

  logout(): Observable<void> {
    return this._indexeddbService.getUser('auth-user').pipe(
      switchMap((user) => {
        if (user) {
          return this._indexeddbService.deleteUser(user);
        } else {
          return of();
        }
      }),
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this._indexeddbService.getUser('auth-user').pipe(
      map((user) => !!user),
      startWith(false),
    );
  }

  getCurrentUser(): Observable<UserRS> {
    return this._indexeddbService
      .getUser('auth-user')
      .pipe(map((user: any) => JSON.parse(user) as UserRS));
  }
}
