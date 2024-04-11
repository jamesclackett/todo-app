package com.james.todoservice.repositories;

import com.james.todoservice.entities.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TodoRepository extends JpaRepository<Todo, UUID> {
    List<Todo> findByPriorityTrueAndAuthUUIDOrderByDueDateAsc(UUID uuid);
    List<Todo> findByCompletedTrueAndAuthUUIDOrderByDueDateAsc(UUID uuid);
    List<Todo> findByAuthUUIDOrderByDueDateAsc(UUID uuid);

}
