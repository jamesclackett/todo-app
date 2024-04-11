package com.james.todoservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TodoDTO {
    private UUID uuid;
    private Long dueDate;
    private String task;
    private Boolean completed;
    private Boolean priority;
    private UUID authUUID;
    private Long createdAt;
}
