package com.devty.GamerGait.controllers;

import com.devty.GamerGait.domain.dto.*;
import com.devty.GamerGait.services.impl.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class EmailController {
    private GamerGaitMailService mailSenderService;
    private ProfileServiceImpl profileService;

    public EmailController(GamerGaitMailService mailSenderService, ProfileServiceImpl profileService){
        this.mailSenderService = mailSenderService;
        this.profileService = profileService;
    }

    @PostMapping("/send-verification-email")
    @CrossOrigin
    public void sendVerificationEmail(@RequestBody EmailDto email){
        ProfileDto profileDto = profileService.findProfileByEmail(email.getEmail());
        try {
            EmailVerifyTokenDto emailVerifyTokenDto = EmailVerificationTokenManager.generateEmailVerifyToken(email.getEmail());
            mailSenderService.sendNewMail(profileDto.getEmail(), "admin@gamergait.com", "Gamer Gait Verify Email",
                    mailSenderService.generateEmailVerifyEmailBody(profileService.findProfileByEmail(email.getEmail()).getUsername(), emailVerifyTokenDto.getToken()));
        }
        catch (Exception e){
            System.out.println(profileDto.getEmail() + " does not exist in db when attempting to verify email");
        }
    }


    @GetMapping("/confirm-verification-email/{token}")
    @CrossOrigin
    public ResponseEntity<String> confirmVerification(@PathVariable("token") UUID token){
        try {
            String email = EmailVerificationTokenManager.getEmailForToken(token);
            ProfileDto profileDto = profileService.findProfileByEmail(email);
            profileService.verifyEmailOfUser(profileDto);
            return new ResponseEntity<>("Ok", HttpStatus.OK);
        }
        catch (Exception e){
            System.out.println("does not exist in db when attempting to verify email");
            return new ResponseEntity<>("Not Ok", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/change-email")
    @CrossOrigin
    public ResponseEntity<ProfileDto> changeEmail(@RequestBody EmailChangeDto emailChangeDto){
       ProfileDto profileDto = profileService.changeEmail(emailChangeDto);

       if (profileDto.equals(new ProfileDto())){
           return new ResponseEntity<>(profileDto, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(profileDto, HttpStatus.OK);
    }
}
