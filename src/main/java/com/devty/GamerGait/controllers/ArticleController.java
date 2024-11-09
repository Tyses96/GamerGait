package com.devty.GamerGait.controllers;

import com.devty.GamerGait.domain.dto.ArticleDto;
import com.devty.GamerGait.domain.dto.NewsDto;
import com.devty.GamerGait.services.impl.ArticleServiceImpl;
import com.devty.GamerGait.services.impl.NewsServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ArticleController {

    ArticleServiceImpl articleService;
    NewsServiceImpl newsService;

    public ArticleController(ArticleServiceImpl articleService, NewsServiceImpl newsService){
        this.articleService = articleService;
        this.newsService = newsService;
    }


    @GetMapping("/indie-insights")
    @CrossOrigin
    public List<ArticleDto> getAllArticles(){
        return articleService.findAll();
    }

    @GetMapping("/indie-insights/{id}")
    @CrossOrigin
    public ResponseEntity<ArticleDto> getArticle(@PathVariable("id") Long id){
        ArticleDto article = articleService.findArticleById(id);
        return new ResponseEntity<>(article, HttpStatus.OK);
    }

    @PostMapping("/store-indie-insight")
    @CrossOrigin
    public ResponseEntity<ArticleDto> storeArticle(@RequestBody ArticleDto articleDto){
        ArticleDto ad = articleService.saveArticle(articleDto);
        return new ResponseEntity<>(ad, HttpStatus.CREATED);
    }

    @GetMapping("/news")
    @CrossOrigin
    public List<NewsDto> getNews(){
        return newsService.findAll();
    }

    @GetMapping("/news/{id}")
    @CrossOrigin
    public ResponseEntity<NewsDto> getNewsPage(@PathVariable("id") Long id){
        NewsDto news = newsService.findArticleById(id);
        return new ResponseEntity<>(news, HttpStatus.OK);
    }

    @PostMapping("/store-news")
    @CrossOrigin
    public ResponseEntity<NewsDto> storeArticle(@RequestBody NewsDto newsDto){
        NewsDto ad = newsService.saveArticle(newsDto);
        return new ResponseEntity<>(ad, HttpStatus.CREATED);
    }
}
