package com.devty.GamerGait.domain.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
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
    @Pattern(regexp = "^[a-zA-Z0-9]{6,12}$")
    private String username;

    @Pattern(regexp = "^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$",message = "Email should be valid")
    @NotNull
    private String email;

    private String password;

    private String userRole;

    private Boolean verified;

    private String salt;

    private Integer tries;

    private Boolean locked;

    private ZonedDateTime unlockDate;
}
