package com.devty.GamerGait.repositories;

import com.devty.GamerGait.domain.entities.ReviewEntity;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends ListCrudRepository<ReviewEntity, Long>,
        PagingAndSortingRepository<ReviewEntity, Long> {

}
