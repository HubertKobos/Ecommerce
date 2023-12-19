package com.example.ecommerceBackend.controllers;

import com.example.ecommerceBackend.dto.OrderDto;
import com.example.ecommerceBackend.dto.OrderItemDto;
import com.example.ecommerceBackend.dto.ShippingAddressDto;
import com.example.ecommerceBackend.entities.OrderEntity;
import com.example.ecommerceBackend.entities.OrderItemEntity;
import com.example.ecommerceBackend.entities.ShippingAddressEntity;
import com.example.ecommerceBackend.entities.UserEntity;
import com.example.ecommerceBackend.exceptions.userExceptions.UserNotExistsException;
import com.example.ecommerceBackend.requests.CalculatePriceResponse;
import com.example.ecommerceBackend.responses.CreateOrderResponse;
import com.example.ecommerceBackend.services.OrderService;
import com.example.ecommerceBackend.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
@Log
public class OrderController {
    private final OrderService orderService;
    private final UserService userService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<OrderEntity>> getOrders(@PathVariable UUID userId){
        Optional<UserEntity> user = userService.getUser(userId);
        if(!user.isPresent()){
            throw new UserNotExistsException(String.format("User with id %s not exists", userId), HttpStatus.NOT_FOUND);
        }
        List<OrderEntity> orders = orderService.getOrders(user.get());
        log.info("Orders" + orders.toString());
        return ResponseEntity.ok(orders);
    }

    @PostMapping
    public ResponseEntity<Void> createOrder(@RequestBody CreateOrderResponse createOrderResponse){
        log.info("Order" + createOrderResponse.toString());
        Optional<UserEntity> user = userService.getUser(createOrderResponse.getOwnerId());
        if(!user.isPresent()){
            throw new UserNotExistsException(String.format("User with id %s do not exists", createOrderResponse.getOwnerId()), HttpStatus.NOT_FOUND);
        }
        log.info("User from database -> " + user.toString());

        ShippingAddressDto shippingAddressDto = ShippingAddressDto.builder()
                .city(createOrderResponse.getShippingAddress().getCity())
                .houseNumber(createOrderResponse.getShippingAddress().getHouseNumber())
                .postalCode(createOrderResponse.getShippingAddress().getPostalCode())
                .shippingPrice(createOrderResponse.getShippingAddress().getShippingPrice())
                .build();

        ShippingAddressEntity shippingAddressEntity = orderService.createShippingAddress(shippingAddressDto);

        ModelMapper modelMapper = new ModelMapper();

        List<OrderItemDto> orderItemDtoList = createOrderResponse.getOrderItems().stream().map(
                orderItem -> modelMapper.map(orderItem, OrderItemDto.class))
                .collect(Collectors.toList());

        List<OrderItemEntity> savedOrderItems = orderService.createOrderItems(orderItemDtoList);
        log.info("savedOrderItems -> " + savedOrderItems.toString());


        OrderDto orderDto = OrderDto.builder()
                .orderItems(orderItemDtoList)
                .shippingAddress(shippingAddressDto)
                .owner(user.get())
                .email(createOrderResponse.getEmail())
                .isDelivered(createOrderResponse.isDelivered())
                .isPaid(createOrderResponse.isPaid())
                .paymentMethod(createOrderResponse.getPaymentMethod())
                .plannedDeliveryDate(createOrderResponse.getPlannedDeliveryDate())
                .paidAt(createOrderResponse.getPaidAt())
                .phoneNumber(createOrderResponse.getPhoneNumber())
                .transportMethod(createOrderResponse.getTransportMethod())
                .shippingAddress(createOrderResponse.getShippingAddress())
                .totalPrice(
                        orderService.calculatePrice(CalculatePriceResponse.builder()
                                        .productIds(createOrderResponse.getOrderItems().stream().map(item -> item.getProductId()).collect(Collectors.toList()))
                                        .qty(createOrderResponse.getOrderItems().stream().map(item -> item.getQty()).collect(Collectors.toList()))
                        .build()))
                .build();

        OrderEntity orderEntity = orderService.createOrderEntity(orderDto, user.get(), shippingAddressEntity, savedOrderItems);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    public ResponseEntity<BigDecimal> calculatePrice(CalculatePriceResponse calculatePriceResponse){
        return ResponseEntity.status(HttpStatus.OK).body(orderService.calculatePrice(calculatePriceResponse));
    }
}
