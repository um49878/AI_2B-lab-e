import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Task} from "./task";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    private http: HttpClient,
  ) { }

  public index(archived = false): Observable<Task[]> {
    const params = new HttpParams()
      .set('archived', archived)
      .set('_sort', 'id')
      .set('_order', 'desc');

    return this.http.get<Task[]>('http://localhost:48878/todos', { params });
  }

  public post(task: Task): Observable<Task> {
    return this.http.post<Task>('http://localhost:48878/todos', task);
  }

  public put(task: Task): Observable<Task> {
    return this.http.put<Task>(`http://localhost:48878/todos/${task.id}`, task);
  }

  public delete(task: Task): Observable<any> {
    return this.http.delete<any>(`http://localhost:48878/todos/${task.id}`);
  }
}
