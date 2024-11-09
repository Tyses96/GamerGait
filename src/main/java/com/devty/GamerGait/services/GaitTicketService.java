package com.devty.GamerGait.services;

import java.util.List;
import java.util.UUID;

public interface GaitTicketService {
    void buyGaitTicket(UUID id);

    List<UUID> getAllUsersTickets(UUID id);
}
