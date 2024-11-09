package com.devty.GamerGait.mappers.impl;

import com.devty.GamerGait.domain.dto.ArticleDto;
import com.devty.GamerGait.domain.entities.ArticleEntity;
import com.devty.GamerGait.mappers.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class ArticleMapper implements Mapper<ArticleEntity, ArticleDto> {

    private ModelMapper mapper;

    public ArticleMapper(ModelMapper mapper){
        this.mapper = mapper;
    }
    @Override
    public ArticleDto mapTo(ArticleEntity articleEntity) {
        return mapper.map(articleEntity, ArticleDto.class);
    }

    @Override
    public ArticleEntity mapFrom(ArticleDto articleDto) {
        return mapper.map(articleDto, ArticleEntity.class);
    }
}
