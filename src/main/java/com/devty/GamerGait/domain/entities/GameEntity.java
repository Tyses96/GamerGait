package com.devty.GamerGait.domain.entities;

import com.devty.GamerGait.domain.dto.ReviewDto;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "games")
public class GameEntity {
    @Id
    private Long id;
    private String name;
    private Long reviews;
    private Long overallGraphicsRating;
    private Long overallGamePlayRating;
    private Long overallStoryRating;
    private Long overallValueForMoneyRating;
    private Long overallRating;
    private Long weight;
    @OneToMany(mappedBy = "gameEntity")
    private Set<ReviewEntity> reviewEntities;
}
