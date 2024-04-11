package com.james.todoservice.entities;

import com.james.todoservice.dtos.TodoDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;

import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
public class Todo {

    public Todo(Long dueDate, String task, Boolean priority, UUID authUUID) {
        this.dueDate = dueDate;
        this.task = task;
        this.priority = priority;
        this.completed = false;
        this.authUUID = authUUID;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;

    @Column(name = "due_date", nullable = false)
    private Long dueDate;

    @Column(nullable = false)
    private String task;

    @Column
    private Boolean completed;

    @Column(nullable = false)
    private Boolean priority;

    @Column(name = "created_at")
    private Long createdAt;

    @Column(name = "auth_uuid", nullable = false)
    private UUID authUUID;
}
