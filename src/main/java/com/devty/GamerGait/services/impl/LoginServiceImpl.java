package com.devty.GamerGait.services.impl;

import com.devty.GamerGait.domain.dto.CookieDto;
import com.devty.GamerGait.domain.dto.UserDto;
import com.devty.GamerGait.domain.entities.UserEntity;
import com.devty.GamerGait.errors.IncorrectPasswordException;
import com.devty.GamerGait.errors.IncorrectUsernameException;
import com.devty.GamerGait.errors.SessionInvalidException;
import com.devty.GamerGait.repositories.UserRepository;
import com.devty.GamerGait.services.LoginService;
import com.devty.GamerGait.util.Hash;
import org.springframework.stereotype.Service;

import javax.security.auth.login.AccountLockedException;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class LoginServiceImpl implements LoginService {

    private static final int MAX_TRIES = 5;
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
            if(Objects.equals(foundUser.get().getPassword(), enteredPsw) && !foundUser.get().getLocked()){
                SessionManager sessionManager = new SessionManager(id);
                sessionManager.run();
                foundUser.get().setTries(0);
                foundUser.get().setLocked(false);
                foundUser.get().setUnlockDate(ZonedDateTime.now().minusYears(100));
                System.out.println(foundUser.get().getUsername() + " Logged in");
                return new CookieDto(sessionManager.findSessionByUserId(id).getToken(),
                        sessionManager.findSessionByUserId(id).getExpiry().atZone(ZoneId.systemDefault()));
            } else {
                throw new IncorrectPasswordException("Incorrect password");
            }
        }
        throw new IncorrectUsernameException("Incorrect username");
    }

    public void verifyAccountUnlocked(String username) throws AccountLockedException {
        UserEntity ue = userRepository.findByUsername(username);
        if(ue.getUnlockDate().isBefore(ZonedDateTime.now())){
            ue.setLocked(false);
        }
        else{
            ue.setLocked(true);
        }
        if(ue.getLocked()){
            throw new AccountLockedException();
        }
        increaseTries(ue);
    }

    public void increaseTries(UserEntity ue){
        int tries = ue.getTries() + 1;
        if(tries >= MAX_TRIES){
            ue.setUnlockDate(ZonedDateTime.now().plusMinutes(10));
        }
        ue.setTries(tries);
        userRepository.save(ue);
    }
}
