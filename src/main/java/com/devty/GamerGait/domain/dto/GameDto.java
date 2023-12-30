package com.devty.GamerGait.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GameDto {
    @JsonProperty("appid")
    private Long id;
    private String name;
    /* Reviews=x
       overallYRating = OverallYRating / reviews
       OverallRating = allOverallRatings / 4
     */
    private Long reviews;
    private Long overallGraphicsRating;
    private Long overallGamePlayRating;
    private Long overallStoryRating;
    private Long overallValueForMoneyRating;
    private Long overallRating;

    private Long weight;

    private ReviewDto reviewDto;
}
