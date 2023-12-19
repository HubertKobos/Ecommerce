package com.example.ecommerceBackend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ShippingAddressEntity {
    @Id
    @GeneratedValue
    private Long id;

    private String city;
    private String postalCode;
    private BigDecimal shippingPrice;
    private String houseNumber;
}
