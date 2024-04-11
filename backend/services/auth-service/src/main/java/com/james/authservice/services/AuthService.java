package com.james.authservice.services;

import com.james.authservice.dtos.AuthDTO;

public interface AuthService {
    AuthDTO createAuth(AuthDTO authDTO);

    AuthDTO verifyAndFindAuth(AuthDTO authDTO) throws Exception;
}
