package com.devty.GamerGait.repositories;

import com.devty.GamerGait.domain.entities.GameEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface GameRepository extends ListCrudRepository<GameEntity, Long>,
        PagingAndSortingRepository<GameEntity, Long> {

    @Query("SELECT g from GameEntity g where g.name ILIKE CONCAT('%', ?1, '%') ORDER BY g.weight DESC,  g.id ASC")
    Page<GameEntity> findGameThroughNameSearch(String searchText, Pageable pageable);

    @Query("SELECT g FROM GameEntity g order by random()")
    List<GameEntity> findRandomGame();


    @Query("Select g From GameEntity g order by g.weight DESC")
    Page<GameEntity> findAllOrderByWeight(Pageable pageable);

    @Query("Select g From GameEntity g order by g.overallValueForMoneyRating DESC")
    Page<GameEntity> findTop8ByOverallValueForMoney(Pageable pageable);
}
