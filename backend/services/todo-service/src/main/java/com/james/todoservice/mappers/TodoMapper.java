package com.james.todoservice.mappers;

import com.james.todoservice.dtos.TodoDTO;
import com.james.todoservice.entities.Todo;

public class TodoMapper {
    public static TodoDTO entityToDTO(Todo todo) {
        return new TodoDTO(
                todo.getUuid(),
                todo.getDueDate(),
                todo.getTask(),
                todo.getCompleted(),
                todo.getPriority(),
                todo.getAuthUUID(),
                todo.getCreatedAt()
        );
    }

    public static Todo dtoToEntity(TodoDTO todoDTO) {
        if (todoDTO.getUuid() == null) {
            return new Todo(
                    todoDTO.getDueDate(),
                    todoDTO.getTask(),
                    todoDTO.getPriority(),
                    todoDTO.getAuthUUID()
            );
        }
        return new Todo(
                todoDTO.getUuid(),
                todoDTO.getDueDate(),
                todoDTO.getTask(),
                todoDTO.getCompleted(),
                todoDTO.getPriority(),
                todoDTO.getCreatedAt(),
                todoDTO.getAuthUUID()
        );

    }
}
