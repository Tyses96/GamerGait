package com.devty.GamerGait.errors;

public class AlreadyInUseException extends Exception{
    public AlreadyInUseException(String errorMessage){
        super(errorMessage);
    }
}
