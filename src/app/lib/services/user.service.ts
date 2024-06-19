import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserRS } from '@lib/interfaces/user';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _httpClient = inject(HttpClient);
  private _baseUrl = `${environment.baseUrl}/users`;

  getUsers(): Observable<UserRS[]> {
    return this._httpClient.get<UserRS[]>(this._baseUrl);
  }
}
