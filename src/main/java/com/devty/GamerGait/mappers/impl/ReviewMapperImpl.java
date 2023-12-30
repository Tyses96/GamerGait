package com.devty.GamerGait.mappers.impl;

import com.devty.GamerGait.domain.dto.ReviewDto;
import com.devty.GamerGait.domain.entities.GameEntity;
import com.devty.GamerGait.domain.entities.ReviewEntity;
import com.devty.GamerGait.mappers.Mapper;
import com.devty.GamerGait.repositories.GameRepository;
import com.devty.GamerGait.repositories.ProfileRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class ReviewMapperImpl implements Mapper<ReviewEntity, ReviewDto> {

    ProfileRepository profileRepository;
    GameRepository gameRepository;

    public ReviewMapperImpl(ProfileRepository profileRepository, GameRepository gameRepository){
        this.profileRepository = profileRepository;
        this.gameRepository = gameRepository;
    }

    @Override
    public ReviewDto mapTo(ReviewEntity reviewEntity) {
        return new ReviewDto(reviewEntity.getId(), reviewEntity.getTitle(), reviewEntity.getBody(),
                reviewEntity.getGraphicsRating(), reviewEntity.getGamePlayRating(), reviewEntity.getStoryRating(),
                reviewEntity.getValueForMoneyRating(), reviewEntity.getProfileEntity(), reviewEntity.getGameEntity(),
                reviewEntity.getProfileEntity().getId(), reviewEntity.getGameEntity().getId());
    }

    @Override
    public ReviewEntity mapFrom(ReviewDto reviewDto) {
        return new ReviewEntity(reviewDto.getId(), reviewDto.getTitle(), reviewDto.getBody(),
                reviewDto.getGraphicsRating(), reviewDto.getGamePlayRating(),
                reviewDto.getStoryRating(), reviewDto.getValueForMoneyRating(),
                gameRepository.findById(reviewDto.getGameId()).get(),
                profileRepository.findById(reviewDto.getProfileId()));
    }
}
