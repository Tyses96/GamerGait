package com.devty.GamerGait.repositories;

import com.devty.GamerGait.domain.entities.NewsEntity;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsRepository extends ListCrudRepository<NewsEntity, Long> {
}
