package com.devty.GamerGait.controllers;

import com.devty.GamerGait.domain.dto.UserDto;
import com.devty.GamerGait.domain.dto.gamedetails.GameDetailDto;
import com.devty.GamerGait.domain.entities.UserEntity;
import com.devty.GamerGait.errors.AlreadyInUseException;
import com.devty.GamerGait.errors.EmailAlreadyInUseException;
import com.devty.GamerGait.errors.UsernameAlreadyInUseException;
import com.devty.GamerGait.mappers.impl.UserMapperImpl;
import com.devty.GamerGait.services.RegistrationService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;

@RestController
@AllArgsConstructor
public class RegisterController {

    RegistrationService registrationService;
    UserMapperImpl userMapper;
    Logger log;

    @PostMapping(path = "/register")
    @CrossOrigin(origins = "http://localhost:63342/")
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
        try {
            UserEntity savedUser = registrationService.registerUser(userDto);
            return new ResponseEntity<>(userMapper.mapTo(savedUser), HttpStatus.CREATED);
        }
        catch (AlreadyInUseException e){
            if(e.equals(UsernameAlreadyInUseException.class)){
                return new ResponseEntity<>(userDto, HttpStatus.BAD_REQUEST);
            }
            else {
                return new ResponseEntity<>(userDto, HttpStatus.CONFLICT);
            }
        }
    }
}
