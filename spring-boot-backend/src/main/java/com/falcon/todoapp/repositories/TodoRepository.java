package com.falcon.todoapp.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import models.Todo;

@Repository
public interface TodoRepository extends MongoRepository<Todo, String> {

}
