package com.devty.GamerGait.domain.dto.gamedetails;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DataDto {
    @JsonProperty("capsule_image")
    String capsuleImage;
    @JsonProperty("header_image")
    String headerImage;
    @JsonProperty("short_description")
    String shortDescription;
}
