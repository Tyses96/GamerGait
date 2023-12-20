package com.devty.GamerGait.mappers.impl;

import com.devty.GamerGait.domain.dto.gamedetails.DataDto;
import com.devty.GamerGait.domain.dto.gamedetails.GameDetailDto;
import com.devty.GamerGait.domain.entities.GameDetailEntity;
import com.devty.GamerGait.mappers.Mapper;
import org.springframework.stereotype.Component;

@Component
public class GameDetailMapperImpl implements Mapper<GameDetailEntity, GameDetailDto> {
    @Override
    public GameDetailDto mapTo(GameDetailEntity gameDetailEntity) {
        DataDto data = new DataDto(gameDetailEntity.getCapsuleImage(), gameDetailEntity.getHeaderImage(),
                gameDetailEntity.getShortDescription());
        return new GameDetailDto(gameDetailEntity.getId(), true, data);
    }

    @Override
    public GameDetailEntity mapFrom(GameDetailDto gameDetailDto) {
        return new GameDetailEntity(gameDetailDto.getId(),
                gameDetailDto.getDataDto().getCapsuleImage(), gameDetailDto.getDataDto().getHeaderImage(),
                gameDetailDto.getDataDto().getShortDescription());
    }
}
