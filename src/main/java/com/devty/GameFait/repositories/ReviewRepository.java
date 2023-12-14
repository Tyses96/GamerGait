package com.devty.GameFait.repositories;

import com.devty.GameFait.domain.entities.ReviewEntity;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReviewRepository extends ListCrudRepository<ReviewEntity, Long>,
        PagingAndSortingRepository<ReviewEntity, Long> {

}
