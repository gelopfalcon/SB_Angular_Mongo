import { Action } from '@ngrx/store';
import { Todo } from '../components/todo';

export const GET_TODOS =     'GET_TODOS';
export const GET_TODOS_SUCCESS =     'GET_TODOS_SUCCESS';
export const CREATE_TODO =   'CREATE_TODO';
export const CREATE_TODO_SUCCESS =   'CREATE_TODO_SUCCESS';
export const CREATE_TODO_FAILED = 'CREATE_TODO_FAILED';
export const DELETE_TODO =   'DELETE_TODO';
export const DELETE_TODO_SUCCESS =   'DELETE_TODO_SUCCESS';
export const DELETE_TODO_FAILED = 'CREATE_TODO_FAILED';

export class getTodosAction implements Action {
    readonly type = GET_TODOS;
  
    constructor() { }
  }

  export class getTodosSuccessAction implements Action {
    readonly type = GET_TODOS_SUCCESS;
  
    constructor(public payload: Todo[]) { }
  }

  export class createTodoAction implements Action {
    readonly type = CREATE_TODO;
  
    constructor(public payload: { todo: Todo }) { }
  }

  export class createTodoSuccessAction implements Action {
    readonly type = CREATE_TODO_SUCCESS;
  
    constructor(public payload: { todo: Todo }) { }
  }

  export class createTodoFailed implements Action {
    readonly type = CREATE_TODO_FAILED;
    constructor(public payload: Error) {}
  }

  export class deleteTodoAction implements Action {
    readonly type = DELETE_TODO;
  
    constructor(public payload: string) { }
  }

  export class deleteTodoSuccessAction implements Action {
    readonly type = DELETE_TODO_SUCCESS;
  
    constructor(public payload: string) { }
  }

  export class deleteTodoFailed implements Action {
    readonly type = DELETE_TODO_FAILED;
    constructor(public payload: Error) {}
  }

  /**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
= getTodosAction
| getTodosSuccessAction
| createTodoAction
| createTodoFailed
| createTodoSuccessAction
| deleteTodoAction
| deleteTodoSuccessAction
| deleteTodoFailed;