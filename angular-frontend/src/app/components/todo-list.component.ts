import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from './todo';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit {
  todos: Todo[];
  newTodo: Todo = new Todo();
  editing: boolean = false;
  editingTodo: Todo = new Todo();

  constructor(
    private todoService: TodoService,
  ) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos()
        .subscribe(
            resultArray => this.todos = resultArray,
            error => console.log("Error :: " + error)
        )
}


  createTodo(todoForm: NgForm): void {
    this.todoService.createTodo(this.newTodo)
    .subscribe(
      createTodo => {
        todoForm.reset();
        this.newTodo = new Todo();
        this.todos.unshift(createTodo)
      },
      error => console.log("Error :: " + error)
    )
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id)
    .subscribe(
      () => {
        this.todos = this.todos.filter(todo => todo.id != id);
      },
      error => console.log("Error :: " + error)
    )
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