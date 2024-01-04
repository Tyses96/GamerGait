package com.devty.GamerGait.services.impl;

import com.devty.GamerGait.domain.UserRole;
import com.devty.GamerGait.domain.dto.ProfileDto;
import com.devty.GamerGait.domain.dto.UserDto;
import com.devty.GamerGait.domain.entities.ProfileEntity;
import com.devty.GamerGait.domain.entities.UserEntity;
import com.devty.GamerGait.errors.AlreadyInUseException;
import com.devty.GamerGait.errors.EmailAlreadyInUseException;
import com.devty.GamerGait.errors.UsernameAlreadyInUseException;
import com.devty.GamerGait.mappers.impl.ProfileMapperImpl;
import com.devty.GamerGait.mappers.impl.UserMapperImpl;
import com.devty.GamerGait.repositories.ProfileRepository;
import com.devty.GamerGait.repositories.UserRepository;
import com.devty.GamerGait.services.RegistrationService;
import com.devty.GamerGait.util.Hash;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.HashSet;

@Service
public class RegistrationServiceImpl implements RegistrationService {

    UserRepository userRepository;
    UserMapperImpl userMapper;

    ProfileRepository profileRepository;
    ProfileMapperImpl profileMapper;

    public RegistrationServiceImpl(UserRepository userRepository, UserMapperImpl userMapper,
    ProfileRepository profileRepository, ProfileMapperImpl profileMapper){
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.profileRepository = profileRepository;
        this.profileMapper = profileMapper;
    }
    @Override
    public UserEntity registerUser(UserDto userDto) throws AlreadyInUseException {
        userDto.setUserRole(UserRole.USER.toString());
        userDto.setLocked(false);
        userDto.setUnlockDate(ZonedDateTime.now().minusYears(100));
        userDto.setTries(0);
        String salt = Hash.generateSalt();
        userDto.setSalt(salt);
        String saltedPassword = userDto.getPassword() + salt;
        userDto.setPassword(Hash.sha256(saltedPassword));

        // Does it exist already?
        UserEntity dbEntityEmail = userRepository.findByEmail(userDto.getEmail());
        UserEntity dbEntityUsername = userRepository.findByUsername(userDto.getUsername());

        // No it doesn't
        if(dbEntityEmail == null && dbEntityUsername == null){
            var userEntity = userRepository.save(userMapper.mapFrom(userDto));
            ProfileEntity profileEntity = new ProfileEntity(userEntity.getId(), userEntity.getUsername(), userEntity.getEmail(),
                    0L,0L, 0L, new HashSet<>());
            profileRepository.save(profileEntity);
            return userEntity;
        }
        // Yes it does
        else if(dbEntityUsername != null){
            throw new UsernameAlreadyInUseException("username: " + userDto.getUsername() + " is already in use.");
        }
        else{
            throw new EmailAlreadyInUseException("email: " + userDto.getEmail() + " is already in use");
        }
    }


}
