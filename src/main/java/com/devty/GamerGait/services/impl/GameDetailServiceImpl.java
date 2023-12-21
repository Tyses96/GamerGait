package com.devty.GamerGait.services.impl;

import com.devty.GamerGait.GamerGaitApplication;
import com.devty.GamerGait.domain.dto.gamedetails.DataDto;
import com.devty.GamerGait.domain.dto.gamedetails.GameDetailDto;
import com.devty.GamerGait.domain.entities.GameDetailEntity;
import com.devty.GamerGait.mappers.impl.GameDetailMapperImpl;
import com.devty.GamerGait.repositories.GameDetailRepository;
import com.devty.GamerGait.services.GameDetailService;
import com.devty.GamerGait.util.JsonUtil;
import com.devty.GamerGait.util.SteamHttpRequest;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

@Service
public class GameDetailServiceImpl implements GameDetailService {

    GameDetailRepository gameDetailRepository;
    GameDetailMapperImpl gameDetailMapper;
    SteamHttpRequest steamHttpRequest;

    @Value("${gamerGait.icon-url}")
    String ggIconUrl;

    public GameDetailServiceImpl(GameDetailRepository gameDetailRepository, SteamHttpRequest steamHttpRequest,
                                 GameDetailMapperImpl gameDetailMapper){
        this.gameDetailRepository = gameDetailRepository;
        this.steamHttpRequest = steamHttpRequest;
        this.gameDetailMapper = gameDetailMapper;
    }

    @Override
    public GameDetailEntity findOne(GameDetailDto gameDetailDto) throws IOException {
        Optional<GameDetailEntity> gameDetail = gameDetailRepository.findById(gameDetailDto.getId());

        if(gameDetail.isEmpty() && gameDetailDto.getSuccess() && shouldSaveGameDetail(gameDetailDto)){
            return gameDetailRepository.save(gameDetailMapper.mapFrom(gameDetailDto));
        }
        else if(gameDetail.isEmpty() && !gameDetailDto.getSuccess() ||
                gameDetail.isEmpty() && !shouldSaveGameDetail(gameDetailDto)){
            String test = ggIconUrl;
            gameDetailDto.setDataDto(new DataDto(ggIconUrl , ggIconUrl, "No description available"));
            GameDetailEntity gameDetailEntity = gameDetailMapper.mapFrom(gameDetailDto);
            return gameDetailEntity;
        }
        else {
            return gameDetail.get();
        }
    }

    private boolean shouldSaveGameDetail(GameDetailDto gameDetailDto){
        return(gameDetailDto.getDataDto().getCapsuleImage() != null &&
                gameDetailDto.getDataDto().getHeaderImage() != null);
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
