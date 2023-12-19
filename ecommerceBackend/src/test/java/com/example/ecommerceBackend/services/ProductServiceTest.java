package com.example.ecommerceBackend.services;

import com.example.ecommerceBackend.config.TestConfig;
import com.example.ecommerceBackend.entities.ProductEntity;
import com.example.ecommerceBackend.repositories.ProductRepository;
import com.example.ecommerceBackend.utils.ProductTestObjects;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Optional;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@DataJpaTest
@ContextConfiguration(classes = TestConfig.class)
public class ProductServiceTest {

    @Autowired
    private ProductServiceImpl productService;

    @Autowired
    private ProductRepository productRepository;

    @Test
    public void testGetAllProducts(){
        ProductEntity productEntity = ProductTestObjects.createProductA(productRepository);
        ProductEntity productEntity2 = ProductTestObjects.createProductB(productRepository);

        List<ProductEntity> arrayTest = productService.getAllProducts();
        assertEquals(arrayTest.size(), 2);

        List<ProductEntity> expectedList = List.of(productEntity, productEntity2);
        assertEquals(arrayTest, expectedList);
    }

    @Test
    public void testGetAllProductsShouldNotReturnAnyObjects(){
        List<ProductEntity> arrayTest = productService.getAllProducts();
        assertEquals(arrayTest.size(), 0);
    }

    @Test
    public void testGetProduct(){
        ProductEntity productEntity = ProductTestObjects.createProductA(productRepository);
        productRepository.save(productEntity);
        Optional<ProductEntity> optionalProductEntity = productService.getProduct(Long.valueOf(1));
        assertEquals(optionalProductEntity.isPresent(), true);
        assertEquals(optionalProductEntity.get(), productEntity);
    }

    @Test
    public void testGetProductShouldNotReturnAnyObjects(){
        Optional<ProductEntity> optionalProductEntity = productService.getProduct(Long.valueOf(1));
        assertEquals(optionalProductEntity.isPresent(), false);
    }

}
