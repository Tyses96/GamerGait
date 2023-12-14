package com.devty.GameFait.controllers;

import com.devty.GameFait.domain.dto.GameDto;
import com.devty.GameFait.domain.entities.GameEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.devty.GameFait.mappers.Mapper;
import com.devty.GameFait.services.GameService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class GameController {
    private GameService gameService;
    private Mapper<GameEntity, GameDto> gameMapper;


    public GameController(GameService gameService, Mapper<GameEntity, GameDto> gameMapper) {
        this.gameService = gameService;
        this.gameMapper = gameMapper;
    }
    @PostMapping(path = "/games")
    public ResponseEntity<GameDto> createGame(@RequestBody GameDto game) {
        GameEntity gameEntity = gameMapper.mapFrom(game);
        GameEntity savedGameEntity = gameService.save(gameEntity);
        return new ResponseEntity<>(gameMapper.mapTo(savedGameEntity), HttpStatus.CREATED);
    }

    @GetMapping(path = "/games")
    public List<GameDto> listGames() {
        List<GameEntity> games = gameService.findAll();
        return games.stream()
                .map(gameMapper::mapTo)
                .collect(Collectors.toList());
    }
    @CrossOrigin(origins = "http://localhost:63343/")
    @GetMapping(path = "/games/search={text}")
    public Page<GameDto> listGamesFilteredByName(@PathVariable("text") String text, Pageable pageable) {
        Page<GameEntity> games = gameService.findGameThroughNameSearch(text, pageable);
        return games.map(gameMapper::mapTo);
    }

    @GetMapping(path = "/games/{id}")
    public ResponseEntity<GameDto> getGame(@PathVariable("id") Long id) {
        Optional<GameEntity> foundGame = gameService.findOne(id);
        return foundGame.map(gameEntity -> {
            GameDto gameDto = gameMapper.mapTo(gameEntity);
            return new ResponseEntity<>(gameDto, HttpStatus.OK);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping(path = "/games/{id}")
    public ResponseEntity<GameDto> fullUpdateGame(
            @PathVariable("id") Long id,
            @RequestBody GameDto gameDto) {

        if(!gameService.isExists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        gameDto.setId(id);
        GameEntity gameEntity = gameMapper.mapFrom(gameDto);
        GameEntity savedGameEntity = gameService.save(gameEntity);
        return new ResponseEntity<>(
                gameMapper.mapTo(savedGameEntity),
                HttpStatus.OK);
    }

    @PatchMapping(path = "/games/{id}")
    public ResponseEntity<GameDto> partialUpdate(
            @PathVariable("id") Long id,
            @RequestBody GameDto gameDto
    ) {
        if(!gameService.isExists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        GameEntity gameEntity = gameMapper.mapFrom(gameDto);
        GameEntity updatedGame = gameService.partialUpdate(id, gameEntity);
        return new ResponseEntity<>(
                gameMapper.mapTo(updatedGame),
                HttpStatus.OK);
    }

    @DeleteMapping(path = "/games/{id}")
    public ResponseEntity deleteGame(@PathVariable("id") Long id) {
        gameService.delete(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
