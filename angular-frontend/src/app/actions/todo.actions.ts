import { Action } from '@ngrx/store';
import { Todo } from '../components/todo';

export const GET_TODOS =     'GET_TODOS';
export const GET_TODOS_SUCCESS =     'GET_TODOS_SUCCESS';
export const CREATE_TODO =   'CREATE_TODO';
export const LOAD =             '[Book] Load';
export const SELECT =           '[Book] Select';

export class getTodosAction implements Action {
    readonly type = GET_TODOS;
  
    constructor() { }
  }

  export class getTodosSuccessAction implements Action {
    readonly type = GET_TODOS_SUCCESS;
  
    constructor(public payload: Todo[]) { }
  }

  /**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
= getTodosAction
| getTodosSuccessAction;