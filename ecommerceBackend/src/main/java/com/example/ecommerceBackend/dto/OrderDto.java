package com.example.ecommerceBackend.dto;

import com.example.ecommerceBackend.entities.OrderItemEntity;
import com.example.ecommerceBackend.entities.ShippingAddressEntity;
import com.example.ecommerceBackend.entities.UserEntity;
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

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class OrderDto {
    private UserEntity owner;

    private ShippingAddressDto shippingAddress;

    private List<OrderItemDto> orderItems;

    private BigDecimal shippingPrice;

    private TransportMethod transportMethod;

    private PaymentMethod paymentMethod;

    private boolean isPaid;
    private Date paidAt;
    private boolean isDelivered;
    private Date plannedDeliveryDate;
    private BigDecimal totalPrice;
    private String email;
    private String phoneNumber;
}
