package com.devty.GamerGait.services.impl;

import com.devty.GamerGait.domain.dto.EmailChangeDto;
import com.devty.GamerGait.domain.dto.ProfileDto;
import com.devty.GamerGait.domain.dto.ReviewDto;
import com.devty.GamerGait.domain.dto.UserDto;
import com.devty.GamerGait.domain.entities.ProfileEntity;
import com.devty.GamerGait.domain.entities.UserEntity;
import com.devty.GamerGait.mappers.impl.ProfileMapperImpl;
import com.devty.GamerGait.mappers.impl.UserMapperImpl;
import com.devty.GamerGait.repositories.ProfileRepository;
import com.devty.GamerGait.repositories.UserRepository;
import com.devty.GamerGait.services.ProfileService;
import com.devty.GamerGait.util.Hash;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProfileServiceImpl implements ProfileService {

    ProfileRepository profileRepository;
    UserRepository userRepository;
    UserMapperImpl userMapper;
    ProfileMapperImpl profileMapper;

    public ProfileServiceImpl(ProfileRepository profileRepository, ProfileMapperImpl profileMapper,
                              UserRepository userRepository, UserMapperImpl userMapper){
        this.profileRepository = profileRepository;
        this.profileMapper = profileMapper;
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public void updateFromReview(ReviewDto reviewDto) {
        ProfileEntity profileEntity = profileRepository.findById(reviewDto.getProfileId());
        profileEntity.setTotalReviews(profileEntity.getTotalReviews() + 1);
        profileEntity.setGaits(profileEntity.getGaits() + 10);
        profileEntity.setStanding(profileEntity.getStanding() + 1);
        profileRepository.save(profileEntity);
    }

    @Override
    public ProfileDto findProfileById(UUID id) {
        ProfileEntity profileEntity = profileRepository.findById(id);
        return profileMapper.mapTo(profileEntity);
    }
    @Override
    public ProfileDto findProfileByEmail(String email) {
        ProfileEntity profileEntity = profileRepository.findByEmail(email.toLowerCase());
        return profileMapper.mapTo(profileEntity);
    }

    @Override
    public UserDto resetPasswordOfUser(String password, ProfileDto profileDto) {
       UserEntity userEntity = userRepository.findByEmail(profileDto.getEmail().toLowerCase());
       String salt = Hash.generateSalt();
       String hashedPassword = Hash.sha256(password + salt);

       userEntity.setPassword(hashedPassword);
       userEntity.setSalt(salt);
       userEntity.setUnlockDate(ZonedDateTime.now().minusMinutes(10));
       userEntity.setTries(0);
       userEntity.setLocked(false);
       userRepository.save(userEntity);

       return userMapper.mapTo(userEntity);
    }

    @Override
    public ProfileDto verifyEmailOfUser(ProfileDto profileDto) {

        ProfileEntity profileEntity = profileRepository.findByEmail(profileDto.getEmail().toLowerCase());
        profileEntity.setVerified(true);
        profileRepository.save(profileEntity);

        return profileDto;
    }

    @Override
    public ProfileDto changeEmail(EmailChangeDto emailChangeDto) {
        var foundUser = Optional.of(userRepository.findByUsername(emailChangeDto.getUsername().toLowerCase()));
        if (foundUser.isPresent()) {
            String enteredPsw = Hash.sha256(emailChangeDto.getPassword() + foundUser.get().getSalt());
            if (Objects.equals(foundUser.get().getPassword(), enteredPsw)) {
                foundUser.get().setTries(0);
                foundUser.get().setLocked(false);
                foundUser.get().setUnlockDate(ZonedDateTime.now().minusYears(100));
                foundUser.get().setEmail(emailChangeDto.getEmail());
                userRepository.save(foundUser.get());

                ProfileEntity profileEntity = profileRepository.findByUsername(emailChangeDto.getUsername().toLowerCase());
                profileEntity.setEmail(emailChangeDto.getEmail());
                profileRepository.save(profileEntity);
                return profileMapper.mapTo(profileEntity);
            }
        }
        return new ProfileDto();
    }

    public Boolean takeAwayGaits(UUID id, Integer cost){
        ProfileEntity profileEntity = profileRepository.findById(id);

        if(profileEntity.getGaits() < cost){
            return false;
        }else{
            profileEntity.setGaits(profileEntity.getGaits() - cost);
            profileRepository.save(profileEntity);
        }
        return true;
    }
}
