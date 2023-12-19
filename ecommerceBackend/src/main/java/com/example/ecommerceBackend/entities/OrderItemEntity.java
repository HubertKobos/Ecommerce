package com.example.ecommerceBackend.entities;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.math.BigDecimal;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class OrderItemEntity {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private ProductEntity productId;


    @ManyToOne
    @JoinColumn(name = "order_id")
    private OrderEntity order;

    private BigDecimal price;

    private int qty;

}
