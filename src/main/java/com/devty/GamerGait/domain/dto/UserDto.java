package com.devty.GamerGait.domain.dto;

import com.devty.GamerGait.domain.UserRole;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {


    private UUID id;
    private String username;
    private String email;
    private String password;
    private Long gaits;
    private UserRole userRole;
}