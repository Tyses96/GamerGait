package com.devty.GamerGait.services;

import com.devty.GamerGait.domain.dto.EmailChangeDto;
import com.devty.GamerGait.domain.dto.ProfileDto;
import com.devty.GamerGait.domain.dto.ReviewDto;
import com.devty.GamerGait.domain.dto.UserDto;

import java.util.UUID;

public interface ProfileService {

    void updateFromReview(ReviewDto reviewDto);
    ProfileDto findProfileById(UUID id);
    ProfileDto findProfileByEmail(String email);
    UserDto resetPasswordOfUser(String password, ProfileDto profileDto);

    ProfileDto verifyEmailOfUser(ProfileDto profileDto);

    ProfileDto changeEmail(EmailChangeDto emailChangeDto);

    Boolean takeAwayGaits(UUID id, Integer cost);
}
