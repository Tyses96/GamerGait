package com.devty.GamerGait.services.sessions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Session {

    private UUID id;
    private String token;
    private LocalDateTime expiry;
}
