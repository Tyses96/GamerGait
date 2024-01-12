package com.devty.GamerGait.controllers;

import com.devty.GamerGait.GamerGaitApplication;
import com.devty.GamerGait.domain.dto.GameDto;
import com.devty.GamerGait.domain.dto.ReviewDto;
import com.devty.GamerGait.domain.dto.gamedetails.DataDto;
import com.devty.GamerGait.domain.dto.gamedetails.GameDetailDto;
import com.devty.GamerGait.domain.entities.GameDetailEntity;
import com.devty.GamerGait.domain.entities.GameEntity;
import com.devty.GamerGait.services.GameDetailService;
import com.devty.GamerGait.services.impl.GameServiceImpl;
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

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.net.UnknownHostException;
import java.util.*;
import java.util.stream.Collectors;

@RestController
public class GameController {
    private GameServiceImpl gameService;
    private GameDetailService gameDetailService;
    private Mapper<GameEntity, GameDto> gameMapper;
    private Mapper<GameDetailEntity, GameDetailDto> gameDetailMapper;




    public GameController(GameServiceImpl gameService, Mapper<GameEntity, GameDto> gameMapper,
    Mapper<GameDetailEntity, GameDetailDto> gameDetailMapper, GameDetailService gameDetailService) {
        this.gameService = gameService;
        this.gameMapper = gameMapper;
        this.gameDetailMapper = gameDetailMapper;
        this.gameDetailService = gameDetailService;
    }
    @PostMapping(path = "/games")
    public ResponseEntity<GameDto> createGame(@RequestBody GameDto game) {
        game.setOverallRating(0L);
        game.setReviews(0L);
        game.setWeight(0L);
        game.setOverallGamePlayRating(0L);
        game.setOverallStoryRating(0L);
        game.setOverallGraphicsRating(0L);
        game.setOverallValueForMoneyRating(0L);
        game.setReviewEntities(new HashSet<>());
        GameEntity gameEntity = gameMapper.mapFrom(game);
        GameEntity savedGameEntity = gameService.save(gameEntity);
        return new ResponseEntity<>(gameMapper.mapTo(savedGameEntity), HttpStatus.CREATED);
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

    @GetMapping(path= "/random-game")
    @CrossOrigin
    public ResponseEntity<GameDto> getRandomGame(){
        return new ResponseEntity<>(gameMapper.mapTo(gameService.findRandomGame()), HttpStatus.OK);
    }

    @GetMapping(path = "/picksofthemonth")
    @CrossOrigin
    public ResponseEntity<List<GameDto>> getMontlyPicks(){
        ArrayList<GameDto> games = new ArrayList<>();
        Set<Long> ids = getTopPickIds();
        for(Long id : ids){
            games.add(gameMapper.mapTo(gameService.findOne(id).get()));
        }
        return new ResponseEntity<>(games, HttpStatus.FOUND);
    }

    @GetMapping(path = "/toprated")
    @CrossOrigin
    public ResponseEntity<Page<GameDto>> getTopRated(Pageable pageable){
        Page<GameEntity> ges = gameService.findTopRated(pageable);
        return new ResponseEntity<>(ges.map(gameMapper::mapTo), HttpStatus.OK);
    }
    @GetMapping(path = "/topvalue")
    @CrossOrigin
    public ResponseEntity<Page<GameDto>> getTopValue(Pageable pageable){
        Page<GameEntity> ges = gameService.findTopValue(pageable);
        return new ResponseEntity<>(ges.map(gameMapper::mapTo), HttpStatus.OK);
    }

    public Set<Long> getTopPickIds(){
        final int TOTAL_TOP_PICKS = 8;
        BufferedReader reader;
        Set<Long> ids = new HashSet<>();

        try {
            reader = new BufferedReader(new FileReader("res/monthly-picks.txt"));
            String line;

            for(int i = 0; i <TOTAL_TOP_PICKS; i++){
                line = reader.readLine();
                ids.add(Long.parseLong(line));
            }

            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ids;
    }
}
