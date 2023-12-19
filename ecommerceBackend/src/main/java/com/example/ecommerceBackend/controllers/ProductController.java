package com.example.ecommerceBackend.controllers;

import com.example.ecommerceBackend.entities.ProductEntity;
import com.example.ecommerceBackend.exceptions.ProductNotExistsException;
import com.example.ecommerceBackend.requests.CreateProductRequest;
import com.example.ecommerceBackend.responses.GetDetailsProductResponse;
import com.example.ecommerceBackend.responses.GetProductResponse;
import com.example.ecommerceBackend.services.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
@Log
public class ProductController {
    private final ProductService productService;
    @GetMapping("/all")
    public ResponseEntity<List<GetProductResponse>> getProducts(){
        ModelMapper modelMapper = new ModelMapper();
        List<ProductEntity> products = productService.getAllProducts();
        List<GetProductResponse> getProductResponses = products.stream().map(
                productEntity ->
                    modelMapper.map(productEntity, GetProductResponse.class)
        ).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(getProductResponses);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<GetDetailsProductResponse> getProduct(@PathVariable Long productId){
        ModelMapper modelMapper = new ModelMapper();
        Optional<ProductEntity> response = productService.getProduct(productId);
        if(!response.isPresent()){
            throw new ProductNotExistsException(String.format("Product with id %l do not exists", productId), HttpStatus.NOT_FOUND);
        }
        GetDetailsProductResponse getDetailsProductResponse = modelMapper.map(response.get(), GetDetailsProductResponse.class);
        return ResponseEntity.ok(getDetailsProductResponse);
    }

    @PostMapping
    public ResponseEntity<Void> createProduct(@RequestPart("product") CreateProductRequest createProductRequest, @RequestPart("file") MultipartFile file){
        // Check if the file is present and not empty
        if (file != null && !file.isEmpty()) {
            productService.createProduct(createProductRequest, file);
        } else {
            // Handle the case where no file is provided
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long productId){
        productService.deleteProduct(productId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
