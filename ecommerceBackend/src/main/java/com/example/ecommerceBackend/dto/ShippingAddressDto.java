package com.example.ecommerceBackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ShippingAddressDto {
    private String city;
    private String postalCode;
    private BigDecimal shippingPrice;
    private String houseNumber;
}
