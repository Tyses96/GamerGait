package com.devty.GameFait.services.impl;

import com.devty.GameFait.domain.entities.GameEntity;
import com.devty.GameFait.repositories.GameRepository;
import com.devty.GameFait.services.GameService;
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
    public Page<GameEntity> findAll(Pageable pageable) {
        return gameRepository.findAll(pageable);
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
}
