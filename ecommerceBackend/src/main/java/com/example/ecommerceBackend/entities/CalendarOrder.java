package com.example.ecommerceBackend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CalendarOrder {
    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    private UserEntity userEntity;

    @OneToOne
    private ShippingAddressEntity shippingAddressEntity;
    private Date plannedDeliveryAt;
    private Date startDate;
    private Date endDate;
    private String phoneNumber;
    private String email;
    private Boolean isPaid;
    private BigDecimal totalPrice;
}
