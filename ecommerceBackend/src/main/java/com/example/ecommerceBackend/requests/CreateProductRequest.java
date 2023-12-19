package com.example.ecommerceBackend.requests;

import com.example.ecommerceBackend.entities.enums.StorageUnit;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CreateProductRequest {
    private String name;
    private int countInStock;

    private StorageUnit storageUnit;

    private String description;

    private BigDecimal price;

    private String deliveredFrom;

    private byte[] image;
}
