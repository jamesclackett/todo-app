package com.james.todoservice.controllers;

import com.james.todoservice.dtos.TodoDTO;
import com.james.todoservice.services.TodoService;
import com.james.todoservice.services.TokenService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/todos")
public class TodoController {

    private TodoService todoService;
    private TokenService tokenService;

    /// ENDPOINTS (ADD INTERCEPTOR IF TIME)
    @PostMapping()
    public ResponseEntity<TodoDTO> createTodo(@RequestBody TodoDTO todoDTO){
        TodoDTO responseDTO = todoService.createTodo(todoDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

    @PatchMapping()
    public ResponseEntity<TodoDTO> updateTodo(@RequestBody TodoDTO todoDTO) {
        TodoDTO responseDTO = todoService.updateTodo(todoDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @DeleteMapping("/{todoUUID}")
    public ResponseEntity<Void> deleteTodo(@PathVariable UUID todoUUID) {
        todoService.deleteTodo(todoUUID);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{userUUID}")
    public ResponseEntity<List<TodoDTO>> getTodos(@PathVariable UUID userUUID) {
        List<TodoDTO> responseDTOs = todoService.getTodos(userUUID);
        return new ResponseEntity<>(responseDTOs, HttpStatus.OK);
    }

    @GetMapping("/{userUUID}/completed")
    public ResponseEntity<List<TodoDTO>> getCompletedTodos(@PathVariable UUID userUUID) {
        List<TodoDTO> responseDTOs = todoService.getCompletedTodos(userUUID);
        return new ResponseEntity<>(responseDTOs, HttpStatus.OK);
    }

    @GetMapping("/{userUUID}/priority")
    public ResponseEntity<List<TodoDTO>> getPriorityTodos(@PathVariable UUID userUUID) {
        List<TodoDTO> responseDTOs = todoService.getPriorityTodos(userUUID);
        return new ResponseEntity<>(responseDTOs, HttpStatus.OK);
    }

}
