package com.devty.GamerGait.controllers;

import com.devty.GamerGait.domain.dto.ReviewDto;
import com.devty.GamerGait.domain.entities.ReviewEntity;
import com.devty.GamerGait.mappers.Mapper;
import com.devty.GamerGait.services.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class ReviewController {
    private ReviewService reviewService;
    private Mapper<ReviewEntity, ReviewDto> reviewMapper;

    public ReviewController(Mapper<ReviewEntity, ReviewDto> reviewMapper, ReviewService reviewService) {
        this.reviewMapper = reviewMapper;
        this.reviewService = reviewService;
    }

    @PutMapping(path = "/reviews/{id}")
    public ResponseEntity<ReviewDto> createUpdateReview(@PathVariable Long id, @RequestBody ReviewDto reviewDto) {
        ReviewEntity reviewEntity = reviewMapper.mapFrom(reviewDto);
        boolean reviewExists = reviewService.isExists(id);
        ReviewEntity savedReviewEntity = reviewService.createUpdateReview(id, reviewEntity);
        ReviewDto savedUpdatedReviewDto = reviewMapper.mapTo(savedReviewEntity);

        if(reviewExists){
            return new ResponseEntity(savedUpdatedReviewDto, HttpStatus.OK);
        } else {
            return new ResponseEntity(savedUpdatedReviewDto, HttpStatus.CREATED);
        }
    }

    @PatchMapping(path = "/reviews/{id}")
    public ResponseEntity<ReviewDto> partialUpdateReview(
            @PathVariable("id") Long id,
            @RequestBody ReviewDto reviewDto
    ){
        if(!reviewService.isExists(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        ReviewEntity reviewEntity = reviewMapper.mapFrom(reviewDto);
        ReviewEntity updatedReviewEntity = reviewService.partialUpdate(id, reviewEntity);
        return new ResponseEntity<>(
                reviewMapper.mapTo(updatedReviewEntity),
                HttpStatus.OK);

    }

    @GetMapping(path = "/reviews")
    public List<ReviewDto> listBooks() {
        List<ReviewEntity> reviews = reviewService.findAll();
        return reviews.stream()
                .map(reviewMapper::mapTo)
                .collect(Collectors.toList());
    }

    @GetMapping(path = "/reviews/{id}")
    public ResponseEntity<ReviewDto> getReview(@PathVariable("id") Long id) {
        Optional<ReviewEntity> foundReview = reviewService.findOne(id);
        return foundReview.map(reviewEntity -> {
            ReviewDto reviewDto = reviewMapper.mapTo(reviewEntity);
            return new ResponseEntity<>(reviewDto, HttpStatus.OK);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping(path = "/reviews/{id}")
    public ResponseEntity deleteBook(@PathVariable("id") Long id) {
        reviewService.delete(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
