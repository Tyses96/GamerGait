package com.devty.GamerGait.repositories;

import com.devty.GamerGait.domain.entities.GameEntity;
import com.devty.GamerGait.domain.entities.ReviewEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ReviewRepository extends ListCrudRepository<ReviewEntity, Long>,
        PagingAndSortingRepository<ReviewEntity, Long> {

    @Query("Select r from ReviewEntity r where r.gameEntity.id = ?1")
    Set<ReviewEntity> findAllByGameId(Long id);
}
