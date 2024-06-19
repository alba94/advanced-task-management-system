import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StatusEnum } from '@lib/enums/task';
import { Task } from '@lib/interfaces/task';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly _httpClient = inject(HttpClient);
  private _baseUrl = `${environment.baseUrl}/tasks`;

  getTasks(): Observable<Task[]> {
    return this._httpClient.get<Task[]>(this._baseUrl);
  }

  createTask(task: Task | null): Observable<Task> {
    return this._httpClient.post<Task>(this._baseUrl, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this._httpClient.put<Task>(`${this._baseUrl}/${task.id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this._httpClient.delete<void>(`${this._baseUrl}/${id}`);
  }

  updateTaskStatus(id: number, status: StatusEnum): Observable<Task> {
    return this._httpClient.patch<Task>(`${this._baseUrl}/${id}`, { status });
  }
}
