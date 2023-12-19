package com.example.ecommerceBackend.dto;

import com.example.ecommerceBackend.entities.enums.StorageUnit;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ProductDto {
    private String name;

    private int countInStock;

    private StorageUnit storageUnit;

    private String description;

    private BigDecimal price;

    private String deliveredFrom;

    private byte[] image;
}
