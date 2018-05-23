import { Injectable } from "@angular/core";
import { TodoService } from "../services/todo.service";
import { Action } from "@ngrx/store";
import { Effect , Actions }  from "@ngrx/effects";
import * as todoActions from '../actions/todo.actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Todo } from "../components/todo";

@Injectable()
export class TodoEffects
{

    @Effect() loadTodos$ = this.actions$
    .ofType(todoActions.GET_TODOS)
    .switchMap(() => this.todoService.getTodos())
    .map(todos =>  new todoActions.getTodosSuccessAction(todos as Todo[]))

    constructor( 
        private todoService: TodoService,
        private actions$:Actions)
    {}
}