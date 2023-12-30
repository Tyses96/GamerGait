package com.devty.GamerGait.controllers;

import com.devty.GamerGait.domain.dto.ReviewDto;
import com.devty.GamerGait.domain.entities.ReviewEntity;
import com.devty.GamerGait.mappers.impl.ReviewMapperImpl;
import com.devty.GamerGait.services.GameService;
import com.devty.GamerGait.services.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
public class ReviewController {

    ReviewService reviewService;
    ReviewMapperImpl reviewMapper;

    GameService gameService;


    public ReviewController(ReviewService reviewService, ReviewMapperImpl reviewMapper, GameService gameService){
        this.reviewService = reviewService;
        this.reviewMapper = reviewMapper;
        this.gameService = gameService;
    }

    @PostMapping(path = "/reviews")
    @CrossOrigin(origins = "http://localhost:63342/")
    public ResponseEntity<ReviewDto> createReview(@RequestBody ReviewDto reviewDto){
        ReviewEntity reviewEntity = reviewService.createReview(reviewMapper.mapFrom(reviewDto));
        gameService.updateFromReview(reviewDto);

        return new ResponseEntity<>(reviewMapper.mapTo(reviewEntity), HttpStatus.CREATED);
    }

    @GetMapping(path = "/reviews/{id}")
    @CrossOrigin(origins = "http://localhost:63342/")
    public ResponseEntity<Set<ReviewDto>> getReviewsByGameId(@PathVariable("id") Long id){
        Set<ReviewDto> reviewDtos = reviewService.findAllReviewsByGameId(id);
        return new ResponseEntity<>(reviewDtos, HttpStatus.OK);
    }
}
