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
public class GameDetailDto {
    Long id;
    Boolean success;
    @JsonProperty("data")
    DataDto dataDto;
}
