package com.example.ecommerceBackend.repositories;

import com.example.ecommerceBackend.entities.OrderItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItemEntity, Long> {
}
