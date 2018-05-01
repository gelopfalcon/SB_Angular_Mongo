package com.falcon.todoapp.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.falcon.todoapp.repositories.TodoRepository;
import models.Todo;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class TodoController {

    @Autowired
    TodoRepository todoRepository;

    @RequestMapping(value="/todos",method=RequestMethod.GET)
    public List<Todo> getAllTodos() {
        Sort sortByCreatedAtDesc = new Sort(Sort.Direction.DESC, "createdAt");
        return todoRepository.findAll(sortByCreatedAtDesc);
    }

    @RequestMapping(value="/todos",method=RequestMethod.POST)
    public Todo createTodo(@Valid @RequestBody Todo todo) {
        todo.setCompleted(false);
        return todoRepository.save(todo);
    }

    @RequestMapping(value="/todos/{id}",method=RequestMethod.GET)
    public ResponseEntity<Todo> getTodoById(@PathVariable("id") String id) {
        return todoRepository.findById(id)
                .map(todo -> ResponseEntity.ok().body(todo))
                .orElse(ResponseEntity.notFound().build());
    }

    @RequestMapping(value="/todos/{id}",method=RequestMethod.PUT)
    public ResponseEntity<Todo> updateTodo(@PathVariable("id") String id,
                                           @Valid @RequestBody Todo todo) {
        return todoRepository.findById(id)
                .map(todoData -> {
                    todoData.setTitle(todo.getTitle());
                    todoData.setCompleted(todo.getCompleted());
                    Todo updatedTodo = todoRepository.save(todoData);
                    return ResponseEntity.ok().body(updatedTodo);
                }).orElse(ResponseEntity.notFound().build());
    }

    @RequestMapping(value="/todos/{id}",method=RequestMethod.DELETE)
    public ResponseEntity<?> deleteTodo(@PathVariable("id") String id) {
        return todoRepository.findById(id)
                .map(todo -> {
                    todoRepository.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
