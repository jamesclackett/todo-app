package com.james.authservice.services;

import com.james.authservice.dtos.AuthDTO;

import java.util.UUID;

public interface TokenService {

    String generateAuthToken(AuthDTO authDTO) throws Exception;

}
