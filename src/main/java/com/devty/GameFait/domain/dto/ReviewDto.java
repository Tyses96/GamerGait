package com.devty.GameFait.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private GameDto gameDto;
}
