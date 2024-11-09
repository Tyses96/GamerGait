package com.devty.GamerGait.services.impl;

import com.devty.GamerGait.domain.dto.ArticleDto;
import com.devty.GamerGait.domain.entities.ArticleEntity;
import com.devty.GamerGait.mappers.impl.ArticleMapper;
import com.devty.GamerGait.repositories.ArticleRepository;
import com.devty.GamerGait.services.ArticleService;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ArticleServiceImpl implements ArticleService {

    ArticleRepository articleRepository;
    ArticleMapper mapper;

    public ArticleServiceImpl(ArticleRepository articleRepository, ArticleMapper mapper){
        this.articleRepository = articleRepository;
        this.mapper = mapper;
    }

    @Override
    public List<ArticleDto> findAll() {
        return articleRepository.findAll().stream().map(x -> mapper.mapTo(x)).collect(Collectors.toList());
    }

    @Override
    public ArticleDto saveArticle(ArticleDto articleDto) {
        articleDto.setDate(ZonedDateTime.now());
        ArticleEntity ae = articleRepository.save(mapper.mapFrom(articleDto));
        return mapper.mapTo(ae);
    }

    @Override
    public ArticleDto findArticleById(Long id) {
        Optional<ArticleEntity> ae = articleRepository.findById(id);

        if(ae.isPresent()){
            return mapper.mapTo(ae.get());
        }
        else return new ArticleDto();
    }


}
