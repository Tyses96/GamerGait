package com.devty.GamerGait.domain.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

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
    @Size(min = 5, max = 64)
    private String title;
    @Size(min = 24, max = 2500)
    private String body;

    @Max(value = 100)
    private Integer graphicsRating;
    @Max(value = 100)
    private Integer gamePlayRating;
    @Max(value = 100)
    private Integer storyRating;
    @Max(value = 100)
    private Integer valueForMoneyRating;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "game_id")
    private GameEntity gameEntity;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_id")
    private ProfileEntity profileEntity;
}
