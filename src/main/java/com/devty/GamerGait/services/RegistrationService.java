package com.devty.GamerGait.services;

import com.devty.GamerGait.domain.dto.UserDto;
import com.devty.GamerGait.domain.entities.UserEntity;
import com.devty.GamerGait.errors.AlreadyInUseException;
import com.devty.GamerGait.errors.EmailAlreadyInUseException;
import com.devty.GamerGait.errors.UsernameAlreadyInUseException;
import org.springframework.stereotype.Service;

public interface RegistrationService {

    UserEntity registerUser(UserDto userDto) throws AlreadyInUseException;
}
