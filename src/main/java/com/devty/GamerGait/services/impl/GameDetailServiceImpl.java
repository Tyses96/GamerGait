package com.devty.GamerGait.services.impl;

import com.devty.GamerGait.domain.dto.gamedetails.GameDetailDto;
import com.devty.GamerGait.domain.entities.GameDetailEntity;
import com.devty.GamerGait.mappers.impl.GameDetailMapperImpl;
import com.devty.GamerGait.repositories.GameDetailRepository;
import com.devty.GamerGait.services.GameDetailService;
import com.devty.GamerGait.util.JsonUtil;
import com.devty.GamerGait.util.SteamHttpRequest;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

@Service
public class GameDetailServiceImpl implements GameDetailService {

    GameDetailRepository gameDetailRepository;
    GameDetailMapperImpl gameDetailMapper;
    SteamHttpRequest steamHttpRequest;

    public GameDetailServiceImpl(GameDetailRepository gameDetailRepository, SteamHttpRequest steamHttpRequest,
                                 GameDetailMapperImpl gameDetailMapper){
        this.gameDetailRepository = gameDetailRepository;
        this.steamHttpRequest = steamHttpRequest;
        this.gameDetailMapper = gameDetailMapper;
    }
    @Override
    public GameDetailEntity save(GameDetailEntity gameDetailEntity){
        return gameDetailRepository.save(gameDetailEntity);
    }

    @Override
    public GameDetailEntity findOne(Long appId) throws IOException {
        Optional<GameDetailEntity> gameDetail = gameDetailRepository.findById(appId);

        if(gameDetail.isEmpty()){
            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            String response = JsonUtil.reWrapToGameReadyJson(steamHttpRequest.getGameDetails(appId));
            GameDetailDto gameDetailDto = mapper.readValue(response, GameDetailDto.class);
            gameDetailDto.setId(appId);
            return gameDetailRepository.save(gameDetailMapper.mapFrom(gameDetailDto));
        }
        else {
            return gameDetail.get();
        }
    }

    @Override
    public boolean isExists(Long id) {
        return gameDetailRepository.existsById(id);
    }

    @Override
    public void delete(Long id) {
        gameDetailRepository.deleteById(id);
    }
}
