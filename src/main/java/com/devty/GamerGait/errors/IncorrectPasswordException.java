package com.devty.GamerGait.errors;

public class IncorrectPasswordException extends Exception{

    public IncorrectPasswordException(String errorMessage){
        super(errorMessage);
    }
}
