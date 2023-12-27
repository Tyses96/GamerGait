package com.devty.GamerGait.services.impl;

import com.devty.GamerGait.domain.UserRole;
import com.devty.GamerGait.domain.dto.UserDto;
import com.devty.GamerGait.domain.entities.UserEntity;
import com.devty.GamerGait.errors.AlreadyInUseException;
import com.devty.GamerGait.errors.EmailAlreadyInUseException;
import com.devty.GamerGait.errors.UsernameAlreadyInUseException;
import com.devty.GamerGait.mappers.impl.UserMapperImpl;
import com.devty.GamerGait.repositories.UserRepository;
import com.devty.GamerGait.services.RegistrationService;
import com.devty.GamerGait.util.Hash;
import org.springframework.stereotype.Service;

@Service
public class RegistrationServiceImpl implements RegistrationService {

    UserRepository userRepository;
    UserMapperImpl userMapper;

    public RegistrationServiceImpl(UserRepository userRepository, UserMapperImpl userMapper){
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }
    @Override
    public UserEntity registerUser(UserDto userDto) throws AlreadyInUseException {
        userDto.setUserRole(UserRole.USER.toString());
        userDto.setPassword(Hash.sha256(userDto.getPassword()));
        UserEntity dbEntityEmail = userRepository.findByEmail(userDto.getEmail());
        UserEntity dbEntityUsername = userRepository.findByUsername(userDto.getUsername());

        if(dbEntityEmail == null && dbEntityUsername == null){
            return userRepository.save(userMapper.mapFrom(userDto));
        }
        else if(dbEntityUsername != null){
            throw new UsernameAlreadyInUseException("username: " + userDto.getUsername() + " is already in use.");
        }
        else{
            throw new EmailAlreadyInUseException("email: " + userDto.getEmail() + " is already in use");
        }
    }


}
