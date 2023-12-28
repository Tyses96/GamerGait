package com.devty.GamerGait.mappers.impl;

import com.devty.GamerGait.domain.dto.ProfileDto;
import com.devty.GamerGait.domain.entities.ProfileEntity;
import com.devty.GamerGait.mappers.Mapper;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class ProfileMapperImpl implements Mapper<ProfileEntity, ProfileDto> {

    ModelMapper modelMapper;
    @Override
    public ProfileDto mapTo(ProfileEntity profileEntity) {
        return modelMapper.map(profileEntity, ProfileDto.class);
    }

    @Override
    public ProfileEntity mapFrom(ProfileDto profileDto) {
        return modelMapper.map(profileDto, ProfileEntity.class);
    }
}
