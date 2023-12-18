package com.devty.GamerGait.controllers;

import com.devty.GamerGait.domain.dto.GameDto;
import com.devty.GamerGait.domain.dto.gamedetails.GameDetailDto;
import com.devty.GamerGait.domain.entities.GameEntity;
import com.devty.GamerGait.util.JsonUtil;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.devty.GamerGait.mappers.Mapper;
import com.devty.GamerGait.services.GameService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
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

    @GetMapping(path= "/gameDetails/{id}")
    @CrossOrigin(origins = "http://localhost:63342/")
    public ResponseEntity<GameDetailDto> passThroughMethodForSteamApiCall(@PathVariable("id") Long id) throws IOException {
        SteamHttpRequest req = new SteamHttpRequest();
        //Custom removing of data that is not used
        String response = JsonUtil.reWrapToGameReadyJson(req.getGameDetails(id));

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        GameDetailDto gameDetailsDto = objectMapper.readValue(response, GameDetailDto.class);
        return new ResponseEntity<>(gameDetailsDto, HttpStatus.OK);
    }


    @CrossOrigin(origins = "http://localhost:63342/")
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
