package com.example.ecommerceBackend.responses;

import com.example.ecommerceBackend.entities.enums.StorageUnit;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetProductResponse {
    private Long id;

    private String name;


    private StorageUnit storageUnit;

    private String description;

    private BigDecimal price;

    private byte[] image;
}
