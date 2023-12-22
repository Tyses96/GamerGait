package com.devty.GamerGait.services.sessions;

import com.devty.GamerGait.errors.SessionInvalidException;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;

@NoArgsConstructor
public class SessionManager implements Runnable {

    private static ArrayList<Session> activeSessions;
    private Session findSessionByToken(String token) throws SessionInvalidException {
            for (Session sesh : activeSessions) {
                if (sesh.getToken().equals(token)) {
                    return sesh;
                }
            }
            throw new SessionInvalidException();
    }
    private void deleteExpiredSessions(){
        LocalDateTime now = LocalDateTime.now();
        for(Session sesh: activeSessions){
            if(sesh.getExpiry().isBefore(now)){
                activeSessions.remove(sesh);
            }
        }
    }

    public boolean authenticate(String token) throws SessionInvalidException {
        deleteExpiredSessions();
        findSessionByToken(token);

    }
    public void addSession(Session session){
        activeSessions.add(session);
    }

    @Override
    public void run() {

    }
}
