package com.devty.GamerGait.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArticleDto {


    Long id;
    String mainImgSrc;
    String listImgSrc;
    String title;
    String body;
    ZonedDateTime date;

}
