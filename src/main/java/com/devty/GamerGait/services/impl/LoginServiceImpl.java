package com.devty.GamerGait.services.impl;

import com.devty.GamerGait.domain.dto.CookieDto;
import com.devty.GamerGait.domain.dto.UserDto;
import com.devty.GamerGait.errors.IncorrectPasswordException;
import com.devty.GamerGait.errors.IncorrectUsernameException;
import com.devty.GamerGait.errors.SessionInvalidException;
import com.devty.GamerGait.repositories.UserRepository;
import com.devty.GamerGait.services.LoginService;
import com.devty.GamerGait.util.Hash;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class LoginServiceImpl implements LoginService {

    UserRepository userRepository;

    public LoginServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    @Override
    public CookieDto findOneByUsername(UserDto userDto) throws IncorrectPasswordException, IncorrectUsernameException,
            SessionInvalidException {
        var foundUser = Optional.of(userRepository.findByUsername(userDto.getUsername()));
        if (foundUser.isPresent()){
            UUID id = foundUser.get().getId();
            String enteredPsw = Hash.sha256(userDto.getPassword() + foundUser.get().getSalt());
            if(Objects.equals(foundUser.get().getPassword(), enteredPsw)){
                SessionManager sessionManager = new SessionManager(id);
                sessionManager.run();
                System.out.println(foundUser.get().getUsername() + " Logged in");
                return new CookieDto(sessionManager.findSessionByUserId(id).getToken(),
                        sessionManager.findSessionByUserId(id).getExpiry().atZone(ZoneId.systemDefault()));
            } else {
                throw new IncorrectPasswordException("Incorrect password");
            }
        }
        throw new IncorrectUsernameException("Incorrect username");
    }
}
