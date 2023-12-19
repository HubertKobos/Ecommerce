package com.example.ecommerceBackend.exceptions.userExceptions;

import org.springframework.http.HttpStatus;

public class UserExistsException extends RuntimeException{
    private final HttpStatus httpStatus;

    public UserExistsException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }
    public HttpStatus getHttpStatus(){
        return httpStatus;
    }
}
