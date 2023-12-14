package com.devty.GamerGait.services;

import com.devty.GamerGait.domain.entities.ReviewEntity;

import java.util.List;
import java.util.Optional;

public interface ReviewService {
    ReviewEntity createUpdateReview(Long id, ReviewEntity reviewEntity);

    List<ReviewEntity> findAll();

    Optional<ReviewEntity> findOne(Long id);

    boolean isExists(Long id);

    ReviewEntity partialUpdate(Long id, ReviewEntity reviewEntity);

    void delete(Long id);
}
