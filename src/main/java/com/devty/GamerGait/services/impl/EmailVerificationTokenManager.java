package com.devty.GamerGait.services.impl;

import com.devty.GamerGait.domain.dto.PasswordResetTokenDto;
import com.devty.GamerGait.domain.dto.EmailVerifyTokenDto;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.UUID;

public class EmailVerificationTokenManager {

    public static ArrayList<EmailVerifyTokenDto> activeEmailVerificationTokens = new ArrayList<>();
    public static EmailVerifyTokenDto generateEmailVerifyToken(String email) {
        EmailVerifyTokenDto emailVerifyToken = new EmailVerifyTokenDto(UUID.randomUUID(), email,
                ZonedDateTime.now().plusHours(12));
        activeEmailVerificationTokens.add(emailVerifyToken);
        return emailVerifyToken;
    }

    public static boolean validateToken(UUID token) {
        removeExpiredTokens();
        return activeEmailVerificationTokens.stream().anyMatch(x -> x.getToken().equals(token));
    }

    private static void removeExpiredTokens(){
        for(EmailVerifyTokenDto token : activeEmailVerificationTokens){
            if(token.getExpiry().isBefore(ZonedDateTime.now())){
                activeEmailVerificationTokens.remove(token);
            }
        }
    }
    public static String getEmailForToken(UUID token){
        for(EmailVerifyTokenDto emailVerifyTokenDto : activeEmailVerificationTokens){
            if (emailVerifyTokenDto.getToken().equals(token)){
                return emailVerifyTokenDto.getEmail();
            }
        }
        return "No email found";
    }
}

