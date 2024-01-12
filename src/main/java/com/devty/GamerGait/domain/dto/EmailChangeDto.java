package com.devty.GamerGait.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailChangeDto {

    String email;
    String username;
    String password;
}
