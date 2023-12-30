package com.devty.GamerGait.services.impl;

import com.devty.GamerGait.domain.dto.ReviewDto;
import com.devty.GamerGait.domain.entities.ReviewEntity;
import com.devty.GamerGait.mappers.impl.ReviewMapperImpl;
import com.devty.GamerGait.repositories.ReviewRepository;
import com.devty.GamerGait.services.ReviewService;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ReviewServiceImpl implements ReviewService {

    private ReviewRepository reviewRepository;
    private ReviewMapperImpl reviewMapper;

    public ReviewServiceImpl(ReviewRepository reviewRepository, ReviewMapperImpl reviewMapper){
        this.reviewRepository = reviewRepository;
        this.reviewMapper = reviewMapper;
    }


    @Override
    public ReviewEntity createReview(ReviewEntity reviewEntity) {
        return reviewRepository.save(reviewEntity);
    }

    @Override
    public Set<ReviewDto> findAllReviewsByGameId(Long id) {
        Set<ReviewEntity> reviewEntities = reviewRepository.findAllByGameId(id);
        Set<ReviewDto> reviewDtos = new HashSet<>();

        reviewEntities.forEach(reviewEntity -> {
            reviewDtos.add(reviewMapper.mapTo(reviewEntity));
        });
        return reviewDtos;
    }

}
