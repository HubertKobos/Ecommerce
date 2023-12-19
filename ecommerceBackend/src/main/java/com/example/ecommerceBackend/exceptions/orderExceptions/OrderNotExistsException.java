package com.example.ecommerceBackend.exceptions.orderExceptions;

import org.springframework.http.HttpStatus;

public class OrderNotExistsException extends RuntimeException{
    private final HttpStatus httpStatus;

    public OrderNotExistsException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }
    public HttpStatus getHttpStatus(){
        return httpStatus;
    }
}
