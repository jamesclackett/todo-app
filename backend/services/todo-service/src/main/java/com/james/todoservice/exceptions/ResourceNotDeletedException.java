package com.james.todoservice.exceptions;

public class ResourceNotDeletedException extends RuntimeException {
    public ResourceNotDeletedException(String message) {
        super(message);
    }
}
