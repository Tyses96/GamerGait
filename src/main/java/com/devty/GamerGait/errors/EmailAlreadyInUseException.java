package com.devty.GamerGait.errors;

public class EmailAlreadyInUseException extends AlreadyInUseException {
    public EmailAlreadyInUseException(String errorMessage){
        super(errorMessage);
    }
}
