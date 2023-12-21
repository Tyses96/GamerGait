package com.devty.GamerGait.errors;

public class UsernameAlreadyInUseException extends AlreadyInUseException{
    public UsernameAlreadyInUseException(String errorMessage){
        super(errorMessage);
    }
}
