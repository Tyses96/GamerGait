package com.devty.GamerGait.services.impl;

import com.devty.GamerGait.domain.dto.UserDto;
import com.devty.GamerGait.domain.entities.UserEntity;
import com.devty.GamerGait.errors.SessionInvalidException;
import com.devty.GamerGait.mappers.impl.UserMapperImpl;
import com.devty.GamerGait.repositories.UserRepository;
import com.devty.GamerGait.services.AuthenticationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    UserRepository userRepository;
    UserMapperImpl userMapper;

    @Override
    public UserDto getUserDetailsFromSession(UUID token) throws SessionInvalidException {
        SessionManager sessionManager = new SessionManager();
        var session = sessionManager.findSessionByToken(token);
        UserEntity user = userRepository.findById(session.getId());
        return userMapper.mapTo(user);
    }
}
