package com.devty.GamerGait.mappers.impl;

import com.devty.GamerGait.domain.dto.ArticleDto;
import com.devty.GamerGait.domain.dto.NewsDto;
import com.devty.GamerGait.domain.entities.NewsEntity;
import com.devty.GamerGait.mappers.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class NewsMapper implements Mapper<NewsEntity, NewsDto> {

    private ModelMapper mapper;

    public NewsMapper(ModelMapper mapper){
        this.mapper = mapper;
    }
    @Override
    public NewsDto mapTo(NewsEntity newsEntity) {
        return mapper.map(newsEntity, NewsDto.class);
    }

    @Override
    public NewsEntity mapFrom(NewsDto newsDto) {
        return mapper.map(newsDto, NewsEntity.class);

    }
}
