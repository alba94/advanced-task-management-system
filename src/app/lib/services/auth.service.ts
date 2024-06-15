import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginRequest, LoginResponse } from '@lib/interfaces/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient);
  private _baseUrl = `http://localhost:3000/login`;

  login(request: LoginRequest): Observable<LoginResponse> {
    return this._httpClient.post<LoginResponse>(
      `${this._baseUrl}/login`,
      request,
    );
  }

  logout(): void {}
}
