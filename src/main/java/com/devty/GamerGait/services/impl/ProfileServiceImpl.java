package com.devty.GamerGait.services.impl;

import com.devty.GamerGait.domain.dto.ProfileDto;
import com.devty.GamerGait.domain.dto.ReviewDto;
import com.devty.GamerGait.domain.entities.ProfileEntity;
import com.devty.GamerGait.mappers.impl.ProfileMapperImpl;
import com.devty.GamerGait.repositories.ProfileRepository;
import com.devty.GamerGait.services.ProfileService;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ProfileServiceImpl implements ProfileService {

    ProfileRepository profileRepository;
    ProfileMapperImpl profileMapper;

    public ProfileServiceImpl(ProfileRepository profileRepository, ProfileMapperImpl profileMapper){
        this.profileRepository = profileRepository;
        this.profileMapper = profileMapper;
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
}
