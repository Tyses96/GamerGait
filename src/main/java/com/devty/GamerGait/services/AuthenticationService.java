package com.devty.GamerGait.services;

import com.devty.GamerGait.domain.dto.UserDto;
import com.devty.GamerGait.errors.SessionInvalidException;

import java.util.UUID;

public interface AuthenticationService {

    UserDto getUserDetailsFromSession(UUID token) throws SessionInvalidException;
}