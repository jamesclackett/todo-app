package com.james.todoservice.services;

import com.james.todoservice.dtos.TodoDTO;

import java.util.List;
import java.util.UUID;

public interface TodoService {
    TodoDTO createTodo(TodoDTO todoDTO);

    TodoDTO updateTodo(TodoDTO todoDTO);

    void deleteTodo(UUID uuid);

    List<TodoDTO> getTodos(UUID userUUID);

    List<TodoDTO> getCompletedTodos(UUID userUUID);

    List<TodoDTO> getPriorityTodos(UUID userUUID);
}
