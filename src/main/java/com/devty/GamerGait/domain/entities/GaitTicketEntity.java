package com.devty.GamerGait.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "gait tickets")
public class GaitTicketEntity {

    @Id
    Long ticketId;
    UUID ownerId;
}
