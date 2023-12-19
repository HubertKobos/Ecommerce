package com.example.ecommerceBackend.entities;

import com.example.ecommerceBackend.entities.enums.PaymentMethod;
import com.example.ecommerceBackend.entities.enums.TransportMethod;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class OrderEntity {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name="t_user_id")
    private UserEntity owner;

    @OneToOne
    @JoinColumn(name="shipping_address_id")
    private ShippingAddressEntity shippingAddress;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItemEntity> orderItems;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private Date createdAt;

    private BigDecimal shippingPrice;

    @Enumerated(EnumType.STRING)
    private TransportMethod transportMethod;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    private boolean isPaid;
    private Date paidAt;
    private boolean isDelivered;
    private Date plannedDeliveryDate;
    private BigDecimal totalPrice;
    private String email;
    private String phoneNumber;
}
