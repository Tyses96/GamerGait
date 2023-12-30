package com.devty.GamerGait.controllers;

import com.devty.GamerGait.domain.dto.ProfileDto;
import com.devty.GamerGait.domain.dto.UserDto;
import com.devty.GamerGait.errors.SessionInvalidException;
import com.devty.GamerGait.services.impl.AuthenticationServiceImpl;
import com.devty.GamerGait.services.impl.SessionManager;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class AuthenticationController {

    AuthenticationServiceImpl authenticationService;

    public AuthenticationController(AuthenticationServiceImpl authenticationService){
        this.authenticationService = authenticationService;
    }

    @GetMapping(path = "/auth/{token}")
    @CrossOrigin(origins = "http://localhost:63342/")
    public ResponseEntity<ProfileDto> getUserDetails(@PathVariable("token") String token){
        if(token == null){
            return new ResponseEntity<>(new ProfileDto(), HttpStatus.BAD_REQUEST);
        }
        String newToken = token.substring(token.indexOf("=") + 1);
        try {
            return new ResponseEntity<>(authenticationService.getUserDetailsFromSession(UUID.fromString(newToken)), HttpStatus.OK);
        } catch (SessionInvalidException e) {
            return new ResponseEntity<>(new ProfileDto(), HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping(path = "/auth/")
    @CrossOrigin(origins = "http://localhost:63342/")
    public ResponseEntity<String> getNoDetails(){
        return new ResponseEntity<>("Ok", HttpStatus.OK);
    }
}
