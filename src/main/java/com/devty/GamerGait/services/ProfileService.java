package com.devty.GamerGait.services;

import com.devty.GamerGait.domain.dto.ProfileDto;
import com.devty.GamerGait.domain.dto.ReviewDto;

import java.util.UUID;

public interface ProfileService {

    void updateFromReview(ReviewDto reviewDto);
    ProfileDto findProfileById(UUID id);
}
