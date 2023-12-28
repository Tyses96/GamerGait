package com.devty.GamerGait.controllers;

import com.devty.GamerGait.domain.dto.CookieDto;
import com.devty.GamerGait.domain.dto.UserDto;
import com.devty.GamerGait.services.impl.LoginServiceImpl;
import com.devty.GamerGait.util.Hash;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class LoginController {

    LoginServiceImpl loginService;

    public LoginController(LoginServiceImpl loginService){
        this.loginService = loginService;
    }


    @PostMapping(path="/login")
    @CrossOrigin(origins = "http://localhost:63342")
    public ResponseEntity<CookieDto> login(@RequestBody UserDto userDto) {
        try{
            CookieDto cookie = loginService.findOneByUsername(userDto);
            return new ResponseEntity<>(cookie, HttpStatus.OK);

        }catch (Exception e) {
            return new ResponseEntity<>(new CookieDto(), HttpStatus.UNAUTHORIZED);
        }
    }
}
