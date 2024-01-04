package com.devty.GamerGait.controllers;

import com.devty.GamerGait.GamerGaitApplication;
import com.devty.GamerGait.domain.dto.GameDto;
import com.devty.GamerGait.domain.dto.gamedetails.DataDto;
import com.devty.GamerGait.domain.dto.gamedetails.GameDetailDto;
import com.devty.GamerGait.domain.entities.GameDetailEntity;
import com.devty.GamerGait.domain.entities.GameEntity;
import com.devty.GamerGait.services.GameDetailService;
import com.devty.GamerGait.util.JsonUtil;
import com.devty.GamerGait.util.SteamHttpRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.devty.GamerGait.mappers.Mapper;
import com.devty.GamerGait.services.GameService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.UnknownHostException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class GameController {
    private GameService gameService;
    private GameDetailService gameDetailService;
    private Mapper<GameEntity, GameDto> gameMapper;
    private Mapper<GameDetailEntity, GameDetailDto> gameDetailMapper;




    public GameController(GameService gameService, Mapper<GameEntity, GameDto> gameMapper,
    Mapper<GameDetailEntity, GameDetailDto> gameDetailMapper, GameDetailService gameDetailService) {
        this.gameService = gameService;
        this.gameMapper = gameMapper;
        this.gameDetailMapper = gameDetailMapper;
        this.gameDetailService = gameDetailService;
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

    @GetMapping(path= "/gameDetails/{id}")
    @CrossOrigin
    public ResponseEntity<GameDetailDto> passThroughMethodForSteamApiCall(@PathVariable("id") Long id) throws IOException {
        SteamHttpRequest req = new SteamHttpRequest();
        //Custom removing of data that is not used
        String response = JsonUtil.reWrapToGameReadyJson(req.getGameDetails(id));
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        GameDetailDto gameDetailsDto = objectMapper.readValue(response, GameDetailDto.class);
        gameDetailsDto.setId(id);
        GameDetailEntity savedGameDetailEntity = gameDetailService.findOne(gameDetailsDto);
        return new ResponseEntity<>(gameDetailMapper.mapTo(savedGameDetailEntity), HttpStatus.OK);
    }

    @GetMapping(path = "/games/search={text}")
    @CrossOrigin
    public Page<GameDto> listGamesFilteredByName(@PathVariable("text") String text, Pageable pageable) {
        Page<GameEntity> games = gameService.findGameThroughNameSearch(text, pageable);
        return games.map(gameMapper::mapTo);
    }

    @GetMapping(path = "/games/{id}")
    @CrossOrigin
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

    @GetMapping(path= "/random-game")
    @CrossOrigin
    public ResponseEntity<GameDto> getRandomGame(){
        return new ResponseEntity<>(gameMapper.mapTo(gameService.findRandomGame()), HttpStatus.OK);
    }

}
