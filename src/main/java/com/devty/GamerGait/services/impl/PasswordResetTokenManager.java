package com.devty.GamerGait.services.impl;

import com.devty.GamerGait.domain.dto.PasswordResetTokenDto;
import com.devty.GamerGait.errors.SessionInvalidException;
import jakarta.mail.Session;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.UUID;

@Getter
@NoArgsConstructor
@Service
public class PasswordResetTokenManager {
    public static ArrayList<PasswordResetTokenDto> activePasswordResetTokens = new ArrayList<>();
    public static PasswordResetTokenDto generatePasswordResetToken(String email) {
        PasswordResetTokenDto passwordResetToken = new PasswordResetTokenDto(UUID.randomUUID(), email,
                ZonedDateTime.now().plusHours(12));
        activePasswordResetTokens.add(passwordResetToken);
        return passwordResetToken;
    }

    public static boolean validateToken(UUID token) {
        removeExpiredTokens();
        return activePasswordResetTokens.stream().anyMatch(x -> x.getToken().equals(token));
    }

    private static void removeExpiredTokens(){
        for(PasswordResetTokenDto token : activePasswordResetTokens){
            if(token.getExpiry().isBefore(ZonedDateTime.now())){
                activePasswordResetTokens.remove(token);
            }
        }
    }
    public static String getEmailForToken(UUID token){
        for(PasswordResetTokenDto passwordResetTokenDto : activePasswordResetTokens){
            if (passwordResetTokenDto.getToken().equals(token)){
                return passwordResetTokenDto.getEmail();
            }
        }
        return "No email found";
    }
}
