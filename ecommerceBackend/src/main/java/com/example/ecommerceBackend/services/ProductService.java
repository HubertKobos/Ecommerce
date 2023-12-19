package com.example.ecommerceBackend.services;

import com.example.ecommerceBackend.entities.ProductEntity;
import com.example.ecommerceBackend.requests.CreateProductRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<ProductEntity> getAllProducts();
    Optional<ProductEntity> getProduct(Long productId);

    void createProduct(CreateProductRequest createProductResponse, MultipartFile file);

    List<ProductEntity> getProducts(List<Long> productIds);
    void deleteProduct(Long productId);
}
