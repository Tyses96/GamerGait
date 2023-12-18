package com.devty.GamerGait.services;

import com.devty.GamerGait.domain.entities.GameDetailEntity;
import com.devty.GamerGait.domain.entities.GameEntity;
import com.devty.GamerGait.domain.entities.ReviewEntity;

import java.io.IOException;
import java.util.Optional;

public interface GameDetailService {
    GameDetailEntity save(GameDetailEntity gameDetailEntity);

    GameDetailEntity findOne(Long appId) throws IOException;

    boolean isExists(Long id);

    void delete(Long id);
}
