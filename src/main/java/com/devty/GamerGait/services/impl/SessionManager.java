package com.devty.GamerGait.services.impl;

import com.devty.GamerGait.domain.dto.SessionDto;
import com.devty.GamerGait.domain.dto.UserDto;
import com.devty.GamerGait.errors.SessionInvalidException;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.UUID;

@Getter
public class SessionManager implements Runnable {

    private static ArrayList<SessionDto> activeSessionDtos = new ArrayList<>();
    private UUID userId;

    public SessionManager(UUID userId){
        this.userId = userId;
    }

    public SessionDto findSessionById(UUID userId) throws SessionInvalidException {
            for (SessionDto sesh : activeSessionDtos) {
                if (sesh.getId().equals(userId)) {
                    return sesh;
                }
            }
            throw new SessionInvalidException();
    }
    private void deleteExpiredSessions(){
        LocalDateTime now = LocalDateTime.now();
        if (activeSessionDtos.isEmpty()){
            return;
        }
        activeSessionDtos.removeIf(sesh -> sesh.getExpiry().isBefore(now));
    }

    public void addSession(SessionDto sessionDto){
        activeSessionDtos.add(sessionDto);
    }

    private SessionDto issueSession(){
        return new SessionDto(userId, UUID.randomUUID(), LocalDateTime.now().plusHours(2));
    }

    private void authenticate(){
        deleteExpiredSessions();
        SessionDto sesh = issueSession();
        System.out.println(sesh);
        addSession(sesh);
    }

    @Override
    public void run() {
        authenticate();
    }
}
