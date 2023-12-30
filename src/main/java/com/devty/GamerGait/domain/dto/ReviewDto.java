package com.devty.GamerGait.domain.dto;

import com.devty.GamerGait.domain.entities.GameEntity;
import com.devty.GamerGait.domain.entities.ProfileEntity;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewDto {

    private Long id;
    private String title;
    private String body;
    private int graphicsRating;
    private int gamePlayRating;
    private int storyRating;
    private int valueForMoneyRating;
    private ProfileEntity profileEntity;
    private GameEntity gameEntity;
    private UUID profileId;
    private Long gameId;
}
