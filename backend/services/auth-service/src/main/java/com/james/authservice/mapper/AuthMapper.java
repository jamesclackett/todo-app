package com.james.authservice.mapper;

import com.james.authservice.dtos.AuthDTO;
import com.james.authservice.entities.Auth;

public class AuthMapper {

    public static AuthDTO entityToDTO(Auth auth) {
        return new AuthDTO(
                auth.getUuid(),
                auth.getUsername(),
                auth.getPassword(),
                auth.getCreatedAt()
        );
    }

    public static Auth dtoToEntity(AuthDTO authDTO) {
        if (authDTO.getUuid() == null) {
            return new Auth(
                    authDTO.getUsername(),
                    authDTO.getPassword()
            );
        }
        return new Auth(
                authDTO.getUuid(),
                authDTO.getUsername(),
                authDTO.getPassword(),
                authDTO.getCreatedAt()
        );
    }
}
