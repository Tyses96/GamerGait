package com.devty.GamerGait.services;

import com.devty.GamerGait.domain.dto.CookieDto;
import com.devty.GamerGait.domain.dto.UserDto;
import com.devty.GamerGait.errors.IncorrectPasswordException;
import com.devty.GamerGait.errors.IncorrectUsernameException;
import com.devty.GamerGait.errors.SessionInvalidException;

import java.util.Optional;
import java.util.UUID;

public interface LoginService {

    CookieDto findOneByUsername(UserDto userDto) throws IncorrectPasswordException,
            IncorrectUsernameException, SessionInvalidException;
}
