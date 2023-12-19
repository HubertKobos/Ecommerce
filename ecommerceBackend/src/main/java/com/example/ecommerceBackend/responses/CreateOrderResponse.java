package com.example.ecommerceBackend.responses;

import com.example.ecommerceBackend.dto.OrderItemDto;
import com.example.ecommerceBackend.dto.ShippingAddressDto;
import com.example.ecommerceBackend.entities.enums.PaymentMethod;
import com.example.ecommerceBackend.entities.enums.TransportMethod;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateOrderResponse {

    private UUID ownerId;

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

