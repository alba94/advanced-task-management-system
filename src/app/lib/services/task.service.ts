import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StatusEnum } from '@lib/enums/task';
import { Task, TaskComment } from '@lib/interfaces/task';
import { Observable, switchMap, tap } from 'rxjs';
import { environment } from 'src/app/environment';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _toasterService = inject(ToasterService);
  private _baseUrl = `${environment.baseUrl}/tasks`;

  getTasks(): Observable<Task[]> {
    return this._httpClient.get<Task[]>(this._baseUrl);
  }

  getTaskById(id: string): Observable<Task> {
    return this._httpClient.get<Task>(`${this._baseUrl}/${id}`);
  }

  createTask(task: Task | null): Observable<Task> {
    return this._httpClient.post<Task>(this._baseUrl, task).pipe(
      tap((task) => {
        if (task) {
          this._toasterService.open('Task created successfully');
        }
      }),
    );
  }

  updateTask(task: Task): Observable<Task> {
    return this._httpClient.put<Task>(`${this._baseUrl}/${task.id}`, task).pipe(
      tap((task) => {
        if (task) {
          this._toasterService.open('Task updated successfully');
        }
      }),
    );
  }

  deleteTask(id: string): Observable<void> {
    return this._httpClient.delete<void>(`${this._baseUrl}/${id}`).pipe(
      tap(() => {
        this._toasterService.open('Task deleted successfully');
      }),
    );
  }

  updateTaskStatus(id: string, status: StatusEnum): Observable<Task> {
    return this._httpClient.patch<Task>(`${this._baseUrl}/${id}`, { status });
  }

  addComment(taskId: string, comment: TaskComment): Observable<Task> {
    return this.getTaskById(taskId).pipe(
      switchMap((task) => {
        const updatedComments = [...(task.comments as []), comment];
        return this._httpClient.patch<Task>(`${this._baseUrl}/${taskId}`, {
          comments: updatedComments,
        });
      }),
    );
  }
}
