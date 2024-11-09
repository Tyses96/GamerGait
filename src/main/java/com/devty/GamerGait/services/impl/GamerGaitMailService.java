package com.devty.GamerGait.services.impl;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class GamerGaitMailService extends MailSenderService{

    public String generatePasswordResetEmailBody(String username, UUID token){
        return "Hi " + username + "!\n\nIf you requested a password reset, please follow this link to reset it: https://gamergait.com/password-reset-confirm.html?t=" + token + "\n\n if you didn't request a password reset, please safely ignore this email.\n\nKind regards,\n\nGamerGait";
    }
    public String generateEmailVerifyEmailBody(String username, UUID token){
        return "Hi " + username + "!\n\n Please verify your account by following this link: https://gamergait.com/verify-email-confirm.html?t=" + token + "\n\n if you didn't create a Gamer Gait account, please safely ignore this email.\n\nKind regards,\n\nGamerGait";
    }
}
