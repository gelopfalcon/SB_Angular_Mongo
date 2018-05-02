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

  createTodo(todoData: Todo): Promise<Todo> {
    return this.http.post(this.baseUrl + '/api/todos/', todoData)
      .toPromise().then(response => response.json() as Todo)
      .catch(this.handleError);
  }

  createTodo1(todoData: Todo): Observable<Todo> {
    return this.http.
      post(this.baseUrl + '/api/todos/', todoData)
      .map((response: Response) => {
        return <Todo>response.json();
      })
      .catch(this.handleError);
  }

  updateTodo(todoData: Todo): Promise<Todo> {
    return this.http.put(this.baseUrl + '/api/todos/' + todoData.id, todoData)
      .toPromise()
      .then(response => response.json() as Todo)
      .catch(this.handleError);
  }

  deleteTodo(id: string): Promise<any> {
    return this.http.delete(this.baseUrl + '/api/todos/' + id)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}