package com.devty.GamerGait.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "profiles")
public class ProfileEntity {

    @Id
    UUID id;
    String username;
    Long gaits;
    Long standing;
    Long totalReviews;
    @OneToMany(mappedBy = "profileEntity")
    Set<ReviewEntity> reviews;
}
