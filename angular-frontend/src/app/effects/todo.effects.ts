import { Injectable } from "@angular/core";
import { TodoService } from "../services/todo.service";
import { Action } from "@ngrx/store";
import { Effect , Actions }  from "@ngrx/effects";
import * as todoActions from '../actions/todo.actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Todo } from "../components/todo";
import { map, catchError, switchMap } from 'rxjs/operators';
import { createTodoAction, 
         createTodoSuccessAction, 
         createTodoFailed,
         deleteTodoAction,
         deleteTodoSuccessAction, 
         deleteTodoFailed} from "../actions/todo.actions";
import { of } from "rxjs/observable/of";

@Injectable()
export class TodoEffects
{

    @Effect() loadTodos$ = this.actions$
    .ofType(todoActions.GET_TODOS)
    .switchMap(() => this.todoService.getTodos())
    .map(todos =>  new todoActions.getTodosSuccessAction(todos as Todo[]))

    @Effect()
    createTodo$ = this.actions$.ofType(todoActions.CREATE_TODO).pipe(
      switchMap((action: createTodoAction) => {
        return this.todoService
          .createTodo(action.payload.todo)
          .pipe(
            switchMap(createdTodo => [
              new createTodoSuccessAction({todo : createdTodo}),
            ]),
            catchError(err => of(new createTodoFailed(err)))
          );
      })
    );

    @Effect()
    deleteTodo$ = this.actions$.ofType(todoActions.DELETE_TODO).pipe(
      switchMap((action: deleteTodoAction) => {
        return this.todoService
          .deleteTodo(action.payload)
          .pipe(
            switchMap(() => [
              new deleteTodoSuccessAction(action.payload),
            ]),
            catchError(err => of(new deleteTodoFailed(err)))
          );
      })
    );

    constructor( 
        private todoService: TodoService,
        private actions$:Actions)
    {}
}