package com.example.ecommerceBackend.dto;

import com.example.ecommerceBackend.entities.ProductEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class OrderItemDto {
    private Long productId;
    private ProductDto product;

    private BigDecimal price;

    private int qty;
}
