package com.devty.GamerGait.mappers.impl;

import com.devty.GamerGait.domain.dto.ReviewDto;
import com.devty.GamerGait.domain.entities.ReviewEntity;
import com.devty.GamerGait.mappers.Mapper;
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
