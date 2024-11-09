package com.devty.GamerGait.services;

import com.devty.GamerGait.domain.dto.ArticleDto;
import com.devty.GamerGait.domain.dto.NewsDto;

import java.util.List;

public interface NewsService {

    List<NewsDto> findAll();

    NewsDto saveArticle(NewsDto newsDto);

    NewsDto findArticleById(Long id);
}
