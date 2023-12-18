package com.devty.GamerGait.repositories;

import com.devty.GamerGait.domain.entities.GameDetailEntity;
import org.springframework.data.repository.ListCrudRepository;

public interface GameDetailRepository extends ListCrudRepository<GameDetailEntity, Long> {
}
