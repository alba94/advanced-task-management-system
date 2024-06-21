import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequest } from '@lib/interfaces/auth';
import { UserRS } from '@lib/interfaces/user';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/app/environment';
import { IndexeddbService } from './indexeddb.service';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _indexeddbService = inject(IndexeddbService);
  private readonly _toasterService = inject(ToasterService);
  private _baseUrl = `${environment.baseUrl}/users`;

  login(request: LoginRequest): Observable<UserRS[]> {
    return this._httpClient
      .get<
        UserRS[]
      >(`${this._baseUrl}?email=${request.email}&password=${request.password}`)
      .pipe(
        tap((response) => {
          if (response?.length) {
            this._indexeddbService.setUser(
              'auth-user',
              JSON.stringify(response[0]),
            );
            localStorage.setItem('auth-user', JSON.stringify(response[0]));
          } else {
            this._toasterService.open('User does not exist');
          }
        }),
      );
  }

  logout(): Observable<void> {
    return this._indexeddbService.getUser('auth-user').pipe(
      switchMap((user) => {
        if (user) {
          localStorage.removeItem('auth-user');
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
    );
  }

  getCurrentUser(): Observable<UserRS> {
    return this._indexeddbService
      .getUser('auth-user')
      .pipe(map((user: any) => user && (JSON.parse(user) as UserRS)));
  }

}
