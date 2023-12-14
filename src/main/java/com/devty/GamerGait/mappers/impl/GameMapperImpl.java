package com.devty.GamerGait.mappers.impl;

import com.devty.GamerGait.domain.dto.GameDto;
import com.devty.GamerGait.domain.entities.GameEntity;
import com.devty.GamerGait.mappers.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class GameMapperImpl implements Mapper<GameEntity, GameDto> {

    private ModelMapper modelMapper;

    public GameMapperImpl(ModelMapper modelMapper){
        this.modelMapper = modelMapper;
    }
    @Override
    public GameDto mapTo(GameEntity gameEntity) {
        return modelMapper.map(gameEntity, GameDto.class);
    }

    @Override
    public GameEntity mapFrom(GameDto gameDto) {
        return modelMapper.map(gameDto, GameEntity.class);
    }
}
