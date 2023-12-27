package com.devty.GamerGait.services.impl;

import com.devty.GamerGait.domain.dto.ProfileDto;
import com.devty.GamerGait.domain.dto.UserDto;
import com.devty.GamerGait.domain.entities.ProfileEntity;
import com.devty.GamerGait.domain.entities.UserEntity;
import com.devty.GamerGait.errors.SessionInvalidException;
import com.devty.GamerGait.mappers.impl.ProfileMapperImpl;
import com.devty.GamerGait.repositories.ProfileRepository;
import com.devty.GamerGait.services.AuthenticationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    ProfileRepository profileRepository;
    ProfileMapperImpl profileMapper;

    @Override
    public ProfileDto getUserDetailsFromSession(UUID token) throws SessionInvalidException {
        SessionManager sessionManager = new SessionManager();
        var session = sessionManager.findSessionByToken(token);
        ProfileEntity profile = profileRepository.findById(session.getId());
        return profileMapper.mapTo(profile);
    }
}
