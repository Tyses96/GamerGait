package com.devty.GamerGait.domain.dto;

import lombok.*;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Builder
public class ProfileDto {
    UUID id;
    String username;
    String email;
    Boolean verified;
    Long gaits;
    Long totalReviews;
    Long standing;
}
