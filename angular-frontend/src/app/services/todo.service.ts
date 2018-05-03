import { Injectable } from '@angular/core';
import { Todo } from '../components/todo';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import "rxjs/Rx";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TodoService {
  private baseUrl = 'http://localhost:8181';

  constructor(private http: Http) { }

  getTodos(): Observable<Todo[]> {
    return this.http
        .get(this.baseUrl + '/api/todos/')
        .map((response: Response) => {
            return <Todo[]>response.json();
        })
        .catch(this.handleError);
}

  createTodo(todoData: Todo): Observable<Todo> {
    return this.http.
      post(this.baseUrl + '/api/todos/', todoData)
      .map((response: Response) => {
        return <Todo>response.json();
      })
      .catch(this.handleError);
  }

  updateTodo(todoData: Todo): Observable<Todo> {
    return this.http.put(this.baseUrl + '/api/todos/' + todoData.id, todoData)
    .map((response: Response) => {
      return <Todo>response.json();
    })
    .catch(this.handleError);
  }

  deleteTodo(id: string): Observable<any> {
    return this.http.
      delete(this.baseUrl + '/api/todos/' + id)
      .catch(this.handleError);
  }

  private handleError(error: any): Observable<any> {
    return Observable.throw(console.error('Some error occured', error));
  }
}