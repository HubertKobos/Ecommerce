package com.example.ecommerceBackend.exceptions.userExceptions;

import com.example.ecommerceBackend.exceptions.ApiError;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class UserExceptionsHandler {
    @ExceptionHandler(UserExistsException.class)
    protected ResponseEntity<Object> handleUserExistsException(UserExistsException ex) {
        ApiError apiError = new ApiError(ex.getHttpStatus(), ex.getMessage());
        return buildResponseEntity(apiError);
    }
    @ExceptionHandler(UserNotExistsException.class)
    protected ResponseEntity<Object> handleUserNotExistsException(UserNotExistsException ex) {
        ApiError apiError = new ApiError(ex.getHttpStatus(), ex.getMessage());
        return buildResponseEntity(apiError);
    }
    private ResponseEntity<Object> buildResponseEntity(ApiError apiError) {
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }
}
