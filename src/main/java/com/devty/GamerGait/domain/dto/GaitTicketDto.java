package com.devty.GamerGait.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GaitTicketDto {
    UUID ownerId;
    Long ticketId;
}
