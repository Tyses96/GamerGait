package com.devty.GamerGait.controllers;

import com.devty.GamerGait.domain.PasswordResetDto;
import com.devty.GamerGait.domain.dto.EmailDto;
import com.devty.GamerGait.domain.dto.PasswordResetTokenDto;
import com.devty.GamerGait.domain.dto.ProfileDto;
import com.devty.GamerGait.domain.dto.UserDto;
import com.devty.GamerGait.services.ProfileService;
import com.devty.GamerGait.services.impl.MailSenderService;
import com.devty.GamerGait.services.impl.PasswordResetTokenManager;
import com.devty.GamerGait.services.impl.ProfileServiceImpl;
import jakarta.validation.constraints.Email;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;


@RestController
public class PasswordController {

    private MailSenderService mailSenderService;
    private ProfileServiceImpl profileService;
    public PasswordController(MailSenderService mailSenderService, ProfileServiceImpl profileService){
        this.mailSenderService = mailSenderService;
        this.profileService = profileService;
    }
    @PostMapping(path = "/password-reset")
    @CrossOrigin
    public void sendResetEmail(@RequestBody EmailDto email){
        ProfileDto profileDto = profileService.findProfileByEmail(email.getEmail());
        try {
            PasswordResetTokenDto passwordResetTokenDto = PasswordResetTokenManager.generatePasswordResetToken(email.getEmail());
            mailSenderService.sendNewMail(profileDto.getEmail(), "admin@gamergait.com", "Gamer Gait Password Reset",
                  generateEmailBody(profileService.findProfileByEmail(email.getEmail()).getUsername(), passwordResetTokenDto.getToken()));
        }
        catch (Exception e){
            System.out.println(profileDto.getEmail() + " does not exist in db for password change");
        }
    }
    @PostMapping(path = "/password-reset/{token}")
    @CrossOrigin
    public ResponseEntity<ProfileDto> resetPassword(@PathVariable("token") UUID token, @RequestBody PasswordResetDto psw){
        if(PasswordResetTokenManager.validateToken(token)){
            ProfileDto profileDto = profileService.findProfileByEmail(PasswordResetTokenManager.getEmailForToken(token));
            profileService.resetPasswordOfUser(psw.getPassword(), profileDto);
            return new ResponseEntity<>(profileDto, HttpStatus.ACCEPTED);
        }
        else {
            return new ResponseEntity<>(new ProfileDto(), HttpStatus.BAD_REQUEST);
        }
    }

    private String generateEmailBody(String username, UUID token){
        return "Hi " + username + "!\n\nIf you requested a password reset, please follow this link to reset it: https://www.gamergait.com/password-reset-confirm.html?t=" + token + "\n\n if you didn't request a password reset, please safely ignore this email.\n\nKind regards,\n\nGamerGait";
    }
}
