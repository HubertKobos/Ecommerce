package com.example.ecommerceBackend.exceptions.userExceptions;

import org.springframework.http.HttpStatus;

public class UserNotExistsException extends RuntimeException{
    private final HttpStatus httpStatus;

    public UserNotExistsException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }
    public HttpStatus getHttpStatus(){
        return httpStatus;
    }
}
