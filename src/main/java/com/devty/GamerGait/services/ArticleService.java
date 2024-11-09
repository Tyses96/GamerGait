package com.devty.GamerGait.services;

import com.devty.GamerGait.domain.dto.ArticleDto;

import java.util.List;

public interface ArticleService {

    List<ArticleDto> findAll();

    ArticleDto saveArticle(ArticleDto articleDto);

    ArticleDto findArticleById(Long id);
}
