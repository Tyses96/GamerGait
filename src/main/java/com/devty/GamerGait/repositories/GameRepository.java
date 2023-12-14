package com.devty.GamerGait.repositories;

import com.devty.GamerGait.domain.entities.GameEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface GameRepository extends ListCrudRepository<GameEntity, Long>,
        PagingAndSortingRepository<GameEntity, Long> {

    @Query("SELECT g from GameEntity g where g.name ILIKE CONCAT('%', ?1, '%')")
    Page<GameEntity> findGameThroughNameSearch(String searchText, Pageable pageable);
}
