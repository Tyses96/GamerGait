package com.devty.GamerGait.services;

import com.devty.GamerGait.domain.dto.GameDto;
import com.devty.GamerGait.domain.dto.ReviewDto;
import com.devty.GamerGait.domain.entities.GameEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;


public interface GameService {
    GameEntity save(GameEntity gameEntity);

    List<GameEntity> findAll();

    Optional<GameEntity> findOne(Long appId);

    boolean isExists(Long appId);

    GameEntity partialUpdate(Long appId, GameEntity bookEntity);

    void delete(Long appId);

    Page<GameEntity> findGameThroughNameSearch(String text, Pageable pageable);

    void updateFromReview(ReviewDto reviewDto);

    GameEntity findRandomGame();

    Page<GameEntity> findTopRated(Pageable page);

    Page<GameEntity> findTopValue(Pageable pageable);

}
