package com.devty.GamerGait.controllers;

import com.devty.GamerGait.domain.dto.CookieDto;
import com.devty.GamerGait.domain.dto.UserDto;
import com.devty.GamerGait.services.impl.LoginServiceImpl;
import com.devty.GamerGait.util.Hash;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.AccountLockedException;
import java.util.UUID;

@RestController
public class LoginController {

    LoginServiceImpl loginService;

    public LoginController(LoginServiceImpl loginService){
        this.loginService = loginService;
    }


    @PostMapping(path="/login")
    @CrossOrigin
    public ResponseEntity<CookieDto> login(@RequestBody UserDto userDto) {
        //check locked and expiry date
        try {
            loginService.verifyAccountUnlocked(userDto.getUsername());
            CookieDto cookie = loginService.findOneByUsername(userDto);
            return new ResponseEntity<>(cookie, HttpStatus.OK);

        }catch (AccountLockedException e){
            return new ResponseEntity<>(new CookieDto(), HttpStatus.LOCKED);
        }
        catch (Exception e) {
            return new ResponseEntity<>(new CookieDto(), HttpStatus.UNAUTHORIZED);
        }
    }
}
