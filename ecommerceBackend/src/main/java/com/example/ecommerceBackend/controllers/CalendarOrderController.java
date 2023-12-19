package com.example.ecommerceBackend.controllers;

import com.example.ecommerceBackend.entities.CalendarOrder;
import com.example.ecommerceBackend.entities.OrderEntity;
import com.example.ecommerceBackend.services.CalendarOrderService;
import com.example.ecommerceBackend.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/calendar")
@RequiredArgsConstructor
public class CalendarOrderController {
    private final CalendarOrderService calendarOrderService;
    private final OrderService orderService;
    @GetMapping
    private ResponseEntity<HashMap<String, List>> getDeliveryDate(){
        Date currentDateTime = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentDateTime);
        calendar.add(Calendar.DAY_OF_MONTH, 5);
        Date dateInFiveDays = calendar.getTime();
        List<CalendarOrder> calendarOrderList = calendarOrderService.getCalendarOrdersByGreaterStartDate(currentDateTime);
        List<OrderEntity> orderEntityList = orderService.getOrdersBetweenDates(currentDateTime, dateInFiveDays);
        HashMap<String, List> cominedData = new HashMap<>();
        cominedData.put("calendarOrderList", calendarOrderList);
        cominedData.put("orderEntities", orderEntityList);
        return ResponseEntity.ok(cominedData);
    }

    @GetMapping("/free-events")
    private ResponseEntity<List<CalendarOrder>> getFreeEvents(){
        Date currentDateTime = new Date();
        List<CalendarOrder> calendarOrderList = calendarOrderService.getCalendarOrdersByGreaterStartDate(currentDateTime);
        return ResponseEntity.ok(calendarOrderList);
    }
}
