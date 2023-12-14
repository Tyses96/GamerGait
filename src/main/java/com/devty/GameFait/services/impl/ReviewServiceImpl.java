package com.devty.GameFait.services.impl;

import com.devty.GameFait.domain.entities.ReviewEntity;
import com.devty.GameFait.repositories.ReviewRepository;
import com.devty.GameFait.services.ReviewService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ReviewServiceImpl implements ReviewService {

    private ReviewRepository reviewRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository){
        this.reviewRepository = reviewRepository;
    }


    @Override
    public ReviewEntity createUpdateReview(Long id, ReviewEntity reviewEntity) {
        reviewEntity.setId(id);
        return reviewRepository.save(reviewEntity);
    }

    @Override
    public List<ReviewEntity> findAll() {
        return StreamSupport.stream(reviewRepository
                                .findAll()
                                .spliterator(),
                        false)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<ReviewEntity> findOne(Long id) {
        return reviewRepository.findById(id);
    }

    @Override
    public boolean isExists(Long id) {
        return reviewRepository.existsById(id);
    }

    @Override
    public ReviewEntity partialUpdate(Long id, ReviewEntity reviewEntity) {
        reviewEntity.setId(id);

        return reviewRepository.findById(id).map(existingReview -> {
            Optional.ofNullable(reviewEntity.getBody()).ifPresent(existingReview::setBody);
            Optional.ofNullable(reviewEntity.getTitle()).ifPresent(existingReview::setTitle);
            Optional.ofNullable(reviewEntity.getGraphicsRating()).ifPresent(existingReview::setGraphicsRating);
            Optional.ofNullable(reviewEntity.getGamePlayRating()).ifPresent(existingReview::setGamePlayRating);
            Optional.ofNullable(reviewEntity.getStoryRating()).ifPresent(existingReview::setStoryRating);
            Optional.ofNullable(reviewEntity.getValueForMoneyRating()).ifPresent(existingReview::setValueForMoneyRating);

            return reviewRepository.save(existingReview);
        }).orElseThrow(() -> new RuntimeException("Author does not exist"));
    }

    @Override
    public void delete(Long id) {
        reviewRepository.deleteById(id);
    }
}
