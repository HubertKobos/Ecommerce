package com.example.ecommerceBackend.exceptions.productExceptions;

import org.springframework.http.HttpStatus;

public class ProductNotExistsException extends RuntimeException {
    private final HttpStatus httpStatus;

    public ProductNotExistsException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }
    public HttpStatus getHttpStatus(){
        return httpStatus;
    }
}
