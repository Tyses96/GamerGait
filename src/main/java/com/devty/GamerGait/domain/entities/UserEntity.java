package com.devty.GamerGait.domain.entities;

import com.devty.GamerGait.domain.UserRole;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="users")
public class UserEntity {

    @Id
    @GeneratedValue
    private UUID id;

    @NotNull
    @Size(min=5, max=16)
    private String username;

    @Email(message = "Email should be valid")
    @NotNull
    private String email;

    @NotNull
    @Size(min=6, max=32)
    private String password;

    private Long gaits;

    private UserRole userRole;
}