package com.devty.GamerGait.services.impl;

import com.devty.GamerGait.domain.dto.SessionDto;
import com.devty.GamerGait.errors.SessionInvalidException;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.UUID;

@Getter
@NoArgsConstructor
@Service
public class SessionManager implements Runnable {

    private static ArrayList<SessionDto> activeSessionDtos = new ArrayList<>();
    private UUID userId;

    public SessionManager(UUID userId){
        this.userId = userId;
    }

    public SessionDto findSessionByUserId(UUID userId) throws SessionInvalidException {
            for (SessionDto sesh : activeSessionDtos) {
                if (sesh.getId().equals(userId)) {
                    return sesh;
                }
            }
            throw new SessionInvalidException();
    }

    public SessionDto findSessionByToken(UUID token) throws SessionInvalidException {
        for (SessionDto sesh : activeSessionDtos) {
            if (sesh.getToken().equals(token)) {
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

    public static void removeSession(UUID token){
        for(SessionDto sesh : activeSessionDtos){
            if (sesh.getToken().equals(token)){
                activeSessionDtos.remove(sesh);
                return;
            }
        }
    }

    private void authenticate(){
        deleteExpiredSessions();
        SessionDto sesh = issueSession();
        addSession(sesh);
        System.out.println(sesh);

    }

    @Override
    public void run() {
        authenticate();
    }
}
