import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Task } from '@lib/interfaces/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly _httpClient = inject(HttpClient);
  private _baseUrl = `http://localhost:3000/tasks`;


  getTasks(): Observable<Task[]> {
    return this._httpClient.get<Task[]>(this._baseUrl);
  }

}
