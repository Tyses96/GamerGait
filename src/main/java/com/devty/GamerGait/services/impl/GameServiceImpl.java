package com.devty.GamerGait.services.impl;

import com.devty.GamerGait.domain.dto.ReviewDto;
import com.devty.GamerGait.domain.entities.GameEntity;
import com.devty.GamerGait.repositories.GameRepository;
import com.devty.GamerGait.services.GameService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class GameServiceImpl implements GameService {

    private GameRepository gameRepository;

    public GameServiceImpl(GameRepository gameRepository){
        this.gameRepository = gameRepository;
    }
    @Override
    public GameEntity save(GameEntity gameEntity) {
        return gameRepository.save(gameEntity);
    }

    @Override
    public List<GameEntity> findAll() {
        return StreamSupport
                .stream(
                        gameRepository.findAll().spliterator(), false).collect(Collectors.toList());
    }

    @Override
    public Optional<GameEntity> findOne(Long appId) {
        return gameRepository.findById(appId);
    }

    @Override
    public boolean isExists(Long appId) {
        return  gameRepository.existsById(appId);
    }

    @Override
    public GameEntity partialUpdate(Long appId, GameEntity bookEntity) {
        bookEntity.setId(appId);

        return gameRepository.findById(appId).map(existingBook -> {
            Optional.ofNullable(bookEntity.getName()).ifPresent(existingBook::setName);
            return gameRepository.save(existingBook);
        }).orElseThrow(() -> new RuntimeException("Game does not exist"));
    }

    @Override
    public void delete(Long appId) {
        gameRepository.deleteById(appId);
    }

    public Page<GameEntity> findGameThroughNameSearch(String text, Pageable pageable) {
        return gameRepository.findGameThroughNameSearch(text, pageable);
    }

    @Override
    public void updateFromReview(ReviewDto reviewDto) {
        GameEntity gameEntity = gameRepository.findById(reviewDto.getGameId()).get();
        Long reviews = gameEntity.getReviews() + 1;
        gameEntity.setReviews(reviews);

        gameEntity.setOverallGraphicsRating((gameEntity.getOverallGraphicsRating() + reviewDto.getGraphicsRating()) / reviews);
        gameEntity.setOverallGamePlayRating((gameEntity.getOverallGamePlayRating() + reviewDto.getGamePlayRating()) / reviews);
        gameEntity.setOverallStoryRating((gameEntity.getOverallStoryRating() + reviewDto.getStoryRating()) / reviews);
        gameEntity.setOverallValueForMoneyRating((gameEntity.getOverallValueForMoneyRating() + reviewDto.getValueForMoneyRating()) / reviews);
        gameEntity.setOverallRating((gameEntity.getOverallGraphicsRating() + gameEntity.getOverallGamePlayRating() +
                gameEntity.getOverallStoryRating() + gameEntity.getOverallValueForMoneyRating()) / 4);
        gameEntity.setWeight(gameEntity.getWeight() + 4);
        gameRepository.save(gameEntity);
    }
}
