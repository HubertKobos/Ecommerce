package com.example.ecommerceBackend.utils;

import com.example.ecommerceBackend.entities.ProductEntity;
import com.example.ecommerceBackend.entities.enums.StorageUnit;
import com.example.ecommerceBackend.repositories.ProductRepository;

import java.math.BigDecimal;

public class ProductTestObjects {

    public static ProductEntity createProductA(ProductRepository productRepository){
        ProductEntity productEntity = ProductEntity.builder().price(BigDecimal.valueOf(12.1)).countInStock(10).deliveredFrom("Warszawa").description("Lorem ipsum").storageUnit(StorageUnit.KG).name("testName").image(null).build();
        productRepository.save(productEntity);
        return productEntity;
    }
    public static ProductEntity createProductB(ProductRepository productRepository){
        ProductEntity productEntity = ProductEntity.builder().price(BigDecimal.valueOf(13.33)).countInStock(20).deliveredFrom("Rzeszow").description("Lorem ipsum2").storageUnit(StorageUnit.BAG).name("testName2").image(null).build();
        productRepository.save(productEntity);
        return productEntity;
    }
}
