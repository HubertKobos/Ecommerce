package com.example.ecommerceBackend.responses;

import com.example.ecommerceBackend.entities.*;
import com.example.ecommerceBackend.entities.enums.PaymentMethod;
import com.example.ecommerceBackend.entities.enums.TransportMethod;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponse {
    private Long id;
    private ShippingAddressEntity shippingAddress;
    private List<OrderItemEntity> orderItems;
    private Date createdAt;
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
