package com.example.ecommerceBackend.services;

import com.example.ecommerceBackend.entities.ProductEntity;
import com.example.ecommerceBackend.repositories.ProductRepository;
import com.example.ecommerceBackend.requests.CreateProductRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    @Override
    public List<ProductEntity> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Optional<ProductEntity> getProduct(Long productId) {
        Optional<ProductEntity> response = productRepository.findById(productId);
        return response;
    }

    @Override
    public void createProduct(CreateProductRequest createProductResponse, MultipartFile file) {
        ModelMapper modelMapper = new ModelMapper();
        ProductEntity productEntity = modelMapper.map(createProductResponse, ProductEntity.class);
        try{
            productEntity.setImage(file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        productRepository.save(productEntity);
    }

    @Override
    public List<ProductEntity> getProducts(List<Long> productIds) {
        List<ProductEntity> products = productIds.stream().map(
                id -> productRepository.findById(id)
        )
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList());
        return products;
    }

    @Override
    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }


}
