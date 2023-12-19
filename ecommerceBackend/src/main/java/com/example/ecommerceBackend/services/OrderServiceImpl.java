package com.example.ecommerceBackend.services;

import com.example.ecommerceBackend.dto.OrderDto;
import com.example.ecommerceBackend.dto.OrderItemDto;
import com.example.ecommerceBackend.dto.ShippingAddressDto;
import com.example.ecommerceBackend.entities.*;
import com.example.ecommerceBackend.exceptions.ProductNotExistsException;
import com.example.ecommerceBackend.exceptions.orderExceptions.OrderNotExistsException;
import com.example.ecommerceBackend.exceptions.userExceptions.UserNotExistsException;
import com.example.ecommerceBackend.repositories.OrderItemRepository;
import com.example.ecommerceBackend.repositories.OrderRepository;
import com.example.ecommerceBackend.repositories.ShippingAddressRepository;
import com.example.ecommerceBackend.requests.CalculatePriceResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log
public class OrderServiceImpl implements OrderService{
    private final OrderRepository orderRepository;
    private final ShippingAddressRepository shippingAddressRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserServiceImpl userService;
    private final ProductServiceImpl productService;
    @Override
    public List<OrderEntity> getOrders(UserEntity user){
        return orderRepository.findByOwner(user);
    }

    @Override
    public OrderEntity createOrderEntity(OrderDto orderDto, UserEntity user, ShippingAddressEntity shippingAddress, List<OrderItemEntity> orderItems) {
        ModelMapper modelMapper = new ModelMapper();
        OrderEntity orderEntity = modelMapper.map(orderDto, OrderEntity.class);
        orderEntity.setShippingAddress(shippingAddress);
        orderEntity.setOwner(user);
        orderEntity.setOrderItems(orderItems);
        OrderEntity savedOrder = orderRepository.save(orderEntity);
        return savedOrder;
    }

    @Override
    public ShippingAddressEntity createShippingAddress(ShippingAddressDto shippingAddressDto) {

        // check if shipping address already exists in database
        List<ShippingAddressEntity> existShippingAddressEntity = shippingAddressRepository.findByCityAndShippingPriceAndHouseNumberAndPostalCode(
                shippingAddressDto.getCity(), shippingAddressDto.getShippingPrice(), shippingAddressDto.getHouseNumber(), shippingAddressDto.getPostalCode()
        );

        if(existShippingAddressEntity.size() >= 1){
            return existShippingAddressEntity.get(0);
        }

        // creates shipping address object
        ShippingAddressEntity shippingAddressEntity = ShippingAddressEntity.builder()
                .city(shippingAddressDto.getCity())
                .shippingPrice(shippingAddressDto.getShippingPrice())
                .houseNumber(shippingAddressDto.getHouseNumber())
                .postalCode(shippingAddressDto.getPostalCode())
                .build();

        ShippingAddressEntity savedShippingAddress = shippingAddressRepository.save(shippingAddressEntity);
        return savedShippingAddress;
    }

    @Override
    public List<OrderItemEntity> mapOrderItems(List<OrderItemDto> orderItemDtos, OrderEntity order) {
        ModelMapper modelMapper = new ModelMapper();
        List<OrderItemEntity> orderItemEntities = orderItemDtos.stream().map(
                orderItem -> modelMapper.map(orderItem, OrderItemEntity.class)

        )
                .peek(orderItemEntity -> orderItemEntity.setOrder(order))
                .collect(Collectors.toList());

        return orderItemEntities;
    }

    @Override
    public BigDecimal calculatePrice(CalculatePriceResponse calculatePriceResponse) {
        List<ProductEntity> productEntityList = productService.getProducts(calculatePriceResponse.getProductIds());
        if(!(productEntityList.size() == calculatePriceResponse.getQty().size())){
            throw new ProductNotExistsException("Product not exists in database", HttpStatus.NOT_FOUND);
        }
        List<BigDecimal> productPrices = productEntityList.stream().map(
                product -> product.getPrice()
        ).collect(Collectors.toList());

        List<Integer> quantities = calculatePriceResponse.getQty();


        BigDecimal sum = BigDecimal.ZERO;
        for(int i = 0; i<productPrices.size(); i++){
            BigDecimal subtotal = productPrices.get(i).multiply(BigDecimal.valueOf(quantities.get(i)));
            sum.add(subtotal);
        }
        return sum;
    }

    @Override
    public void insertOrderToUser(OrderEntity order, UUID userId) {
        Optional<UserEntity> user = userService.getUser(userId);
        if(!user.isPresent()){
            throw new UserNotExistsException(String.format("User with id %s do not exists", userId), HttpStatus.NOT_FOUND);
        }
        OrderEntity orderToSave = getOrder(order.getId());
        orderToSave.setOwner(user.get());
        createOrder(orderToSave);
    }

    @Override
    public OrderEntity insertOrderItemsToOrder(OrderEntity order, List<OrderItemEntity> orderItemEntities) {
        order.setOrderItems(orderItemEntities);
        return orderRepository.save(order);
    }

    @Override
    public OrderEntity getOrder(Long orderId) {
        Optional<OrderEntity> orderEntityOptional = orderRepository.findById(orderId);
        if(!orderEntityOptional.isPresent()){
            throw new OrderNotExistsException(String.format("Order with id %l do not exists", orderId), HttpStatus.NOT_FOUND);
        }
        return orderEntityOptional.get();
    }

    @Override
    public void createOrder(OrderEntity orderEntity) {
        orderRepository.save(orderEntity);
    }

    @Override
    public List<OrderItemEntity> createOrderItems(List<OrderItemDto> orderItemEntities) {
        log.info("dupa -> " + orderItemEntities.toString());
        List<OrderItemEntity> savedOrderItems = orderItemEntities.stream()
                .map(orderItem -> {
                    ProductEntity productEntity = productService.getProduct(orderItem.getProductId()).get();
                    OrderItemEntity orderItemEntity = OrderItemEntity.builder()
                            .order(null)
                            .id(null)
                            .qty(orderItem.getQty())
                            .price(productEntity.getPrice().multiply(BigDecimal.valueOf(orderItem.getQty())))
                            .productId(productEntity)
                            .build();
                    return orderItemRepository.save(orderItemEntity);
                })
                .collect(Collectors.toList());
        log.info("saveOrderItems ->" + savedOrderItems.toString());
        return savedOrderItems;
    }

    @Override
    public List<OrderEntity> getOrdersBetweenDates(Date dateOne, Date dateTwo) {
        return orderRepository.getOrderEntitiesByPlannedDeliveryDateGreaterThanAndPlannedDeliveryDateLessThanEqual(dateOne, dateTwo);
    }
}
