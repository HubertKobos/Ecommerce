package com.example.ecommerceBackend.exceptions.orderExceptions;

import com.example.ecommerceBackend.exceptions.ApiError;
import com.example.ecommerceBackend.exceptions.userExceptions.UserNotExistsException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class OrderExceptionsHandler {
    @ExceptionHandler(OrderNotExistsException.class)
    protected ResponseEntity<Object> handleOrderNotExistsException(OrderNotExistsException ex) {
        ApiError apiError = new ApiError(ex.getHttpStatus(), ex.getMessage());
        return buildResponseEntity(apiError);
    }
    private ResponseEntity<Object> buildResponseEntity(ApiError apiError) {
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }
}
