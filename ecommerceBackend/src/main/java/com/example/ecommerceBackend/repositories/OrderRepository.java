package com.example.ecommerceBackend.repositories;

import com.example.ecommerceBackend.entities.OrderEntity;
import com.example.ecommerceBackend.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    public List<OrderEntity> findByOwner(UserEntity userId);
    List<OrderEntity> getOrderEntitiesByPlannedDeliveryDateGreaterThanAndPlannedDeliveryDateLessThanEqual(Date plannedDeliveryDate, Date plannedDeliveryDate2);

}
