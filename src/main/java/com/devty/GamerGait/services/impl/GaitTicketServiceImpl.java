package com.devty.GamerGait.services.impl;

import com.devty.GamerGait.domain.entities.GaitTicketEntity;
import com.devty.GamerGait.repositories.GaitTicketRepository;
import com.devty.GamerGait.repositories.ProfileRepository;
import com.devty.GamerGait.services.GaitTicketService;
import com.devty.GamerGait.services.ProfileService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;
@Service
public class GaitTicketServiceImpl implements GaitTicketService {
    private static final Integer GAIT_TICKET_COST = 50;
    ProfileServiceImpl profileService;
    GaitTicketRepository gaitTicketRepository;

    public GaitTicketServiceImpl(ProfileServiceImpl profileService, GaitTicketRepository gaitTicketRepository){
        this.profileService = profileService;
        this.gaitTicketRepository = gaitTicketRepository;
    }


    @Override
    public void buyGaitTicket(UUID id) {
        Boolean success = profileService.takeAwayGaits(id, GAIT_TICKET_COST);

        if(success){
            Random r = new Random();
            gaitTicketRepository.save(new GaitTicketEntity(r.nextLong(), id));
        }
    }

    public List<UUID> getAllUsersTickets(UUID id){
        List<UUID> tickets = new ArrayList<>();
        gaitTicketRepository.findAllByOwnerId(id).forEach(x-> tickets.add(x.getOwnerId()));
        return tickets;
    }
}
