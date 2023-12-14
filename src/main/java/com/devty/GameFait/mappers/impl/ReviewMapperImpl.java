package com.devty.GameFait.mappers.impl;

import com.devty.GameFait.domain.dto.ReviewDto;
import com.devty.GameFait.domain.entities.ReviewEntity;
import com.devty.GameFait.mappers.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class ReviewMapperImpl implements Mapper<ReviewEntity, ReviewDto> {
    private ModelMapper modelMapper;

    public ReviewMapperImpl(ModelMapper modelMapper){
        this.modelMapper = modelMapper;
    }
    @Override
    public ReviewDto mapTo(ReviewEntity reviewEntity) {
        return modelMapper.map(reviewEntity, ReviewDto.class);
    }

    @Override
    public ReviewEntity mapFrom(ReviewDto reviewDto) {
        return modelMapper.map(reviewDto, ReviewEntity.class);
    }
}
