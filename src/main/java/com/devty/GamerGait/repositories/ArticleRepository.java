package com.devty.GamerGait.repositories;

import com.devty.GamerGait.domain.entities.ArticleEntity;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends ListCrudRepository<ArticleEntity, Long> {
}
