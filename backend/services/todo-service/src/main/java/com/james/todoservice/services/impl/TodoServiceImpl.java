package com.james.todoservice.services.impl;

import com.james.todoservice.dtos.TodoDTO;
import com.james.todoservice.entities.Todo;
import com.james.todoservice.exceptions.ResourceNotDeletedException;
import com.james.todoservice.exceptions.ResourceNotFoundException;
import com.james.todoservice.mappers.TodoMapper;
import com.james.todoservice.repositories.TodoRepository;
import com.james.todoservice.services.TodoService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TodoServiceImpl implements TodoService {

    private TodoRepository todoRepository;

    @Override
    public TodoDTO createTodo(TodoDTO todoDTO) {
        Todo todo = TodoMapper.dtoToEntity(todoDTO);
        Todo responseTodo = todoRepository.save(todo);
        return TodoMapper.entityToDTO(responseTodo);
    }

    @Override
    public TodoDTO updateTodo(TodoDTO todoDTO) {
        Todo todo = TodoMapper.dtoToEntity(todoDTO);
        Todo responseTodo = todoRepository.save(todo);
        return TodoMapper.entityToDTO(responseTodo);
    }

    @Override
    public void deleteTodo(UUID uuid) {
        try {
            todoRepository.deleteById(uuid);
        } catch (Exception e) {
            throw new ResourceNotDeletedException(e.getMessage());
        }
    }

    @Override
    public List<TodoDTO> getTodos(UUID userUUID) {
        List<Todo> todoList = todoRepository.findByAuthUUIDOrderByDueDateAsc(userUUID);
        return todoList.stream().map(TodoMapper::entityToDTO).collect(Collectors.toList());
    }

    @Override
    public List<TodoDTO> getCompletedTodos(UUID userUUID) {
        List<Todo> todoList = todoRepository.findByCompletedTrueAndAuthUUIDOrderByDueDateAsc(userUUID);
        return todoList.stream().map(TodoMapper::entityToDTO).collect(Collectors.toList());
    }

    @Override
    public List<TodoDTO> getPriorityTodos(UUID userUUID) {
        List<Todo> todoList = todoRepository.findByPriorityTrueAndAuthUUIDOrderByDueDateAsc(userUUID);
        return todoList.stream().map(TodoMapper::entityToDTO).collect(Collectors.toList());
    }
}
