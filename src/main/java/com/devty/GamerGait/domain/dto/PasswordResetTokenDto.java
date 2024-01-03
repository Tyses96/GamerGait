package com.devty.GamerGait.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.ZonedDateTime;
import java.util.UUID;

@AllArgsConstructor
@Data
public class PasswordResetTokenDto {

    private UUID token;
    private String email;
    private ZonedDateTime expiry;
}
