package com.devty.GamerGait.controllers;

import com.devty.GamerGait.domain.dto.ReviewDto;
import com.devty.GamerGait.domain.entities.ReviewEntity;
import com.devty.GamerGait.mappers.impl.ReviewMapperImpl;
import com.devty.GamerGait.services.GameService;
import com.devty.GamerGait.services.ProfileService;
import com.devty.GamerGait.services.ReviewService;
import com.devty.GamerGait.services.impl.ProfileServiceImpl;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
public class ReviewController {

    ReviewService reviewService;
    ReviewMapperImpl reviewMapper;

    GameService gameService;

    ProfileServiceImpl profileService;


    public ReviewController(ReviewService reviewService, ReviewMapperImpl reviewMapper, GameService gameService,
    ProfileServiceImpl profileService) {
        this.reviewService = reviewService;
        this.reviewMapper = reviewMapper;
        this.gameService = gameService;
        this.profileService = profileService;
    }

    @PostMapping(path = "/reviews")
    @CrossOrigin
    public ResponseEntity<ReviewDto> createReview(@RequestBody ReviewDto reviewDto){
        try {
            ReviewEntity reviewEntity = reviewService.createReview(reviewMapper.mapFrom(reviewDto));
            gameService.updateFromReview(reviewDto);
            profileService.updateFromReview(reviewDto);
            return new ResponseEntity<>(reviewMapper.mapTo(reviewEntity), HttpStatus.CREATED);
        }
        catch (ConstraintViolationException e){
            return new ResponseEntity<>(new ReviewDto(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(path = "/reviews/{id}")
    @CrossOrigin
    public ResponseEntity<Set<ReviewDto>> getReviewsByGameId(@PathVariable("id") Long id){
        Set<ReviewDto> reviewDtos = reviewService.findAllReviewsByGameId(id);
        return new ResponseEntity<>(reviewDtos, HttpStatus.OK);
    }
}
