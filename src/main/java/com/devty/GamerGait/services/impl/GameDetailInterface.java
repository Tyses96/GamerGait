package com.devty.GamerGait.services.impl;

import com.devty.GamerGait.domain.entities.GameDetailEntity;
import com.devty.GamerGait.domain.entities.GameEntity;
import com.devty.GamerGait.domain.entities.ReviewEntity;

public interface GameDetailInterface {
    ReviewEntity createUpdateGameDetail(Long id, ReviewEntity reviewEntity);

    void delete(Long id);
}
