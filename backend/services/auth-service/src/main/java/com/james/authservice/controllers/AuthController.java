package com.james.authservice.controllers;

import com.james.authservice.dtos.AuthDTO;
import com.james.authservice.dtos.AuthResponseDTO;
import com.james.authservice.services.AuthService;
import com.james.authservice.services.TokenService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/auth")
public class AuthController {

    private AuthService authService;
    private TokenService tokenService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody AuthDTO authDTO) {
        AuthDTO responseDTO = authService.createAuth(authDTO);
        if (responseDTO == null) {
            return new ResponseEntity<>("failed to register user", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("successfully registered user", HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> loginUser(@RequestBody AuthDTO authDTO) throws Exception {
        AuthDTO found = authService.verifyAndFindAuth(authDTO);
        if(found != null){
            String token = tokenService.generateAuthToken(found);
            AuthResponseDTO authResponseDTO =
                    new AuthResponseDTO(found.getUuid(), found.getUsername(), token);
            return new ResponseEntity<>(authResponseDTO, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

}
