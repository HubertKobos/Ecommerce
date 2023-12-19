package com.example.ecommerceBackend.repositories;

import com.example.ecommerceBackend.entities.ShippingAddressEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface ShippingAddressRepository extends JpaRepository<ShippingAddressEntity, Long> {
    List<ShippingAddressEntity> findByCityAndShippingPriceAndHouseNumberAndPostalCode(String city, BigDecimal shippingPrice, String houseNumber, String postalCode);
}
