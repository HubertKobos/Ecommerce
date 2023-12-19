package com.example.ecommerceBackend.entities;

import com.example.ecommerceBackend.entities.enums.StorageUnit;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductEntity {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private int countInStock;

    @Enumerated(EnumType.STRING)
    private StorageUnit storageUnit;

    private String description;

    private BigDecimal price;

    private String deliveredFrom;

    @Lob
    @Column(name="image-data", length = 1000, columnDefinition = "oid")
    private byte[] image;
}
