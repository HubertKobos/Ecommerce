package com.example.ecommerceBackend.exceptions.productExceptions;

import com.example.ecommerceBackend.exceptions.ApiError;
import com.example.ecommerceBackend.exceptions.ProductNotExistsException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ProductExceptionsHandler {
    @ExceptionHandler(ProductNotExistsException.class)
    protected ResponseEntity<Object> handleProductNotExistsException(ProductNotExistsException ex) {
        ApiError apiError = new ApiError(ex.getHttpStatus(), ex.getMessage());
        return buildResponseEntity(apiError);
    }
    private ResponseEntity<Object> buildResponseEntity(ApiError apiError) {
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }
}
