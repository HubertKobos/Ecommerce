package com.example.ecommerceBackend.services;

import com.example.ecommerceBackend.entities.CalendarOrder;

import java.util.Date;
import java.util.List;

public interface CalendarOrderService {
    List<CalendarOrder> getCalendarOrdersByGreaterStartDate(Date startDate);
}
