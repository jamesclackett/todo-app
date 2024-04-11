package com.james.todoservice.services;

import java.util.UUID;

public interface TokenService {

    boolean verifyUser(String token, UUID uuid) throws Exception;
}
