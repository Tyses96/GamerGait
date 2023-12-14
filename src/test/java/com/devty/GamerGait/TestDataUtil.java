package com.devty.GamerGait;

import com.devty.GamerGait.domain.dto.GameDto;
import com.devty.GamerGait.domain.dto.ReviewDto;
import com.devty.GamerGait.domain.entities.GameEntity;
import com.devty.GamerGait.domain.entities.ReviewEntity;

public class TestDataUtil {

    public static GameEntity createTestGameA(){
        return GameEntity.builder().id(1L).name("Shelf life 1").build();
    }
    public static GameEntity createTestGameB(){
        return GameEntity.builder().id(2L).name("Shelf life 2").build();
    }
    public static GameEntity createTestGameC(){
        return GameEntity.builder().id(3L).name("Hands down under").build();
    }
    public static GameEntity createTestGameD(){
        return GameEntity.builder().id(4L).name("Shallow halls").build();
    }
    public static GameDto createTestGameDtoA(){
        return GameDto.builder().id(4L).name("Game D").build();
    }

    public static ReviewEntity createTestReviewA(final GameEntity gameEntity){
        return ReviewEntity.builder()
                .title("Awesome times")
                .body("Great game amazing couldnt ask for better")
                .gamePlayRating(85)
                .storyRating(90)
                .graphicsRating(71)
                .valueForMoneyRating(88)
                .gameEntity(gameEntity).build();
    }
    public static ReviewEntity createTestReviewB(final GameEntity gameEntity){
        return ReviewEntity.builder()
                .id(1L)
                .title("Absolute rubbish")
                .body("Wouldn't reccomend to anyone")
                .gamePlayRating(30)
                .storyRating(22)
                .graphicsRating(51)
                .valueForMoneyRating(20)
                .gameEntity(gameEntity).build();
    }
    public static ReviewDto createTestReviewDtoA(final GameDto gameDto){
        return ReviewDto.builder()
                .id(1L)
                .title("it's Alright")
                .body("Wouldn't play again")
                .gamePlayRating(84)
                .storyRating(36)
                .graphicsRating(30)
                .valueForMoneyRating(35)
                .gameDto(gameDto).build();
    }
}
