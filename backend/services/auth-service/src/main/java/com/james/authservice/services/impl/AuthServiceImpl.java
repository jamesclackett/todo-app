package com.james.authservice.services.impl;

import com.james.authservice.dtos.AuthDTO;
import com.james.authservice.entities.Auth;
import com.james.authservice.exceptions.ResourceNotFoundException;
import com.james.authservice.mapper.AuthMapper;
import com.james.authservice.repositories.AuthRepository;
import com.james.authservice.services.AuthService;
import lombok.AllArgsConstructor;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private AuthRepository authRepository;

    @Override
    // generate timestamp -> hash password -> save to repo
    public AuthDTO createAuth(AuthDTO authDTO) {
        String encodedPassword = BCrypt.hashpw(authDTO.getPassword(), BCrypt.gensalt());
        authDTO.setPassword(encodedPassword);

        Auth auth = AuthMapper.dtoToEntity(authDTO);
        Auth responseAuth = authRepository.save(auth);

        return AuthMapper.entityToDTO(responseAuth);
    }

    @Override
    // Find Auth in database and check if password hash matches hash of provided
    public AuthDTO verifyAndFindAuth(AuthDTO authDTO) throws Exception {
        AuthDTO storedDTO = findAuthByUsername(authDTO.getUsername());

        if (!BCrypt.checkpw(authDTO.getPassword(), storedDTO.getPassword())){
            throw new Exception("invalid auth");
        }
        return storedDTO;
    }

    /// HELPER METHODS:

    // Find Auth object by username string or throw error
    public AuthDTO findAuthByUsername(String username) {
        Optional<Auth> authOptional = authRepository.findByUsername(username);
        Auth auth = authOptional.orElseThrow(() -> new ResourceNotFoundException("username not found"));
        return AuthMapper.entityToDTO(auth);
    }


}
