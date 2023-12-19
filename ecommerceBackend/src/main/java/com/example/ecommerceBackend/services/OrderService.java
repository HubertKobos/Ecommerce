package com.example.ecommerceBackend.services;

import com.example.ecommerceBackend.dto.OrderDto;
import com.example.ecommerceBackend.dto.OrderItemDto;
import com.example.ecommerceBackend.dto.ShippingAddressDto;
import com.example.ecommerceBackend.entities.OrderEntity;
import com.example.ecommerceBackend.entities.OrderItemEntity;
import com.example.ecommerceBackend.entities.ShippingAddressEntity;
import com.example.ecommerceBackend.entities.UserEntity;
import com.example.ecommerceBackend.requests.CalculatePriceResponse;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface OrderService {
    List<OrderEntity> getOrders(UserEntity user);
    OrderEntity createOrderEntity(OrderDto orderDto, UserEntity user, ShippingAddressEntity shippingAddress, List<OrderItemEntity> orderItems);
    ShippingAddressEntity createShippingAddress(ShippingAddressDto shippingAddressDto);
    List<OrderItemEntity> mapOrderItems(List<OrderItemDto> orderItemDtos, OrderEntity order);
    BigDecimal calculatePrice(CalculatePriceResponse calculatePriceResponse);
    void insertOrderToUser(OrderEntity order, UUID userId);
    OrderEntity insertOrderItemsToOrder(OrderEntity order, List<OrderItemEntity> orderItemEntities);
    OrderEntity getOrder(Long orderId);
    void createOrder(OrderEntity orderEntity);
    List<OrderItemEntity> createOrderItems(List<OrderItemDto> orderItemEntities);
    List<OrderEntity> getOrdersBetweenDates(Date dateOne, Date dateTwo);

}
