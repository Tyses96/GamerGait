package com.devty.GamerGait.controllers;

import com.devty.GamerGait.domain.dto.EmailDto;
import com.devty.GamerGait.domain.dto.IdDto;
import com.devty.GamerGait.services.GaitTicketService;
import com.devty.GamerGait.services.impl.GaitTicketServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class GaitTicketController {

    GaitTicketServiceImpl gaitTicketService;

    public GaitTicketController(GaitTicketServiceImpl gaitTicketService){
        this.gaitTicketService = gaitTicketService;
    }
    @PostMapping("/buy-gait-ticket")
    @CrossOrigin
    public void buyGaitTickets(@RequestBody IdDto idDto){
        gaitTicketService.buyGaitTicket(idDto.getId());
    }

    @GetMapping("/check-tickets/{token}")
    @CrossOrigin
    public List<UUID> getUsersTickets(@PathVariable("token") UUID id){
        return gaitTicketService.getAllUsersTickets(id);
    }
}
