package com.devty.GamerGait.services;

import com.devty.GamerGait.domain.dto.ReviewDto;
import com.devty.GamerGait.domain.entities.ReviewEntity;

import java.util.Set;

public interface ReviewService {
    ReviewEntity createReview(ReviewEntity reviewEntity);

    Set<ReviewDto> findAllReviewsByGameId(Long id);
}
