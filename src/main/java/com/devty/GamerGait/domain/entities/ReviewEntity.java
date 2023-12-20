package com.devty.GamerGait.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "reviews")
public class ReviewEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "review_id_seq")
    private Long id;
    private String title;
    private String body;

    private Integer graphicsRating;
    private Integer gamePlayRating;
    private Integer storyRating;
    private Integer valueForMoneyRating;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "game_id")
    private GameEntity gameEntity;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "game_detail_id")
    GameDetailEntity gameDetailEntity;
}
