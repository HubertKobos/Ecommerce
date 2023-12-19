package com.example.ecommerceBackend.repositories;

import com.example.ecommerceBackend.entities.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.UUID;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
}
