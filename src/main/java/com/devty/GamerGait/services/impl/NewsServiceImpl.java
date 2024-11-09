package com.devty.GamerGait.services.impl;

import com.devty.GamerGait.domain.dto.ArticleDto;
import com.devty.GamerGait.domain.dto.NewsDto;
import com.devty.GamerGait.domain.entities.ArticleEntity;
import com.devty.GamerGait.domain.entities.NewsEntity;
import com.devty.GamerGait.mappers.impl.NewsMapper;
import com.devty.GamerGait.repositories.NewsRepository;
import com.devty.GamerGait.services.NewsService;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NewsServiceImpl implements NewsService {

    NewsRepository newsRepository;
    NewsMapper mapper;
    public NewsServiceImpl(NewsRepository newsRepository, NewsMapper mapper){
        this.newsRepository = newsRepository;
        this.mapper = mapper;
    }

    @Override
    public List<NewsDto> findAll() {
        return newsRepository.findAll().stream().map(x -> mapper.mapTo(x)).collect(Collectors.toList());
    }

    @Override
    public NewsDto saveArticle(NewsDto newsDto) {
        newsDto.setDate(ZonedDateTime.now());
        NewsEntity ae = newsRepository.save(mapper.mapFrom(newsDto));
        return mapper.mapTo(ae);
    }

    @Override
    public NewsDto findArticleById(Long id) {
        Optional<NewsEntity> ae = newsRepository.findById(id);

        if(ae.isPresent()){
            return mapper.mapTo(ae.get());
        }
        else return new NewsDto();
    }
}
