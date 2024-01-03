package com.devty.GamerGait.controllers;

import com.devty.GamerGait.domain.dto.CookieDto;
import com.devty.GamerGait.domain.dto.ProfileDto;
import com.devty.GamerGait.errors.SessionInvalidException;
import com.devty.GamerGait.services.impl.SessionManager;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class LogoutController {

    @PostMapping(path = "/logout")
    @CrossOrigin
    public ResponseEntity<String> getUserDetails(@RequestBody CookieDto cookieDto){
        if(cookieDto.getToken() == null){
            return new ResponseEntity<>("Not logged in.", HttpStatus.BAD_REQUEST);
        }
        SessionManager.removeSession(cookieDto.getToken());
        return new ResponseEntity<>(cookieDto.getToken() + " destroyed", HttpStatus.OK);
    }
}
