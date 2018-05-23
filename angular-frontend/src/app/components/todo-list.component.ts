import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from './todo';
import {NgForm} from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../reducers/todo.reducer';
import "rxjs/Rx";
import { Observable } from 'rxjs/Observable';
import * as todoActions from '../actions/todo.actions';
import { getTodosSelector } from '../selectors/todo.selector';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]>;

  todos: Todo[];
  newTodo: Todo = new Todo();
  editing: boolean = false;
  editingTodo: Todo = new Todo();

  constructor(
    private todoService: TodoService,
    private store: Store<State>
  ) {
  }

  ngOnInit(): void {
    this.getTodos();
    this.todos$ = this.store.select(getTodosSelector);
    this.todos$.subscribe(item => console.log(item));
  }

  getTodos(): void {
       this.store.dispatch(new todoActions.getTodosAction());
}


  createTodo(todoForm: NgForm): void {
    this.store.dispatch(new todoActions.createTodoAction({todo:this.newTodo}));
    todoForm.reset();
  }

  deleteTodo(id: string): void {
    /*
    this.todoService.deleteTodo(id)
    .subscribe(
      () => {
        this.todos = this.todos.filter(todo => todo.id != id);
      },
      error => console.log("Error :: " + error)
    )*/

    this.store.dispatch( new todoActions.deleteTodoAction(id))
  }

  updateTodo(todoData: Todo): void {
    console.log(todoData);
    this.todoService.updateTodo(todoData)
    .subscribe(updatedTodo => {
      let existingTodo = this.todos.find(todo => todo.id === updatedTodo.id);
      Object.assign(existingTodo, updatedTodo);
      this.clearEditing();
    });
  }

  toggleCompleted(todoData: Todo): void {
    todoData.completed = !todoData.completed;
    this.todoService.updateTodo(todoData)
    .subscribe(updatedTodo => {
      let existingTodo = this.todos.find(todo => todo.id === updatedTodo.id);
      Object.assign(existingTodo, updatedTodo);
    });
  }

  editTodo(todoData: Todo): void {
    this.editing = true;
    Object.assign(this.editingTodo, todoData);
  }

  clearEditing(): void {
    this.editingTodo = new Todo();
    this.editing = false;
  }
}