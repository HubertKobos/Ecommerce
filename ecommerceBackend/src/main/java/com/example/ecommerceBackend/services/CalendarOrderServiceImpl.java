package com.example.ecommerceBackend.services;

import com.example.ecommerceBackend.entities.CalendarOrder;
import com.example.ecommerceBackend.repositories.CalendarOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CalendarOrderServiceImpl implements CalendarOrderService{
    private final CalendarOrderRepository calendarOrderRepository;
    @Override
    public List<CalendarOrder> getCalendarOrdersByGreaterStartDate(Date startDate) {
        return calendarOrderRepository.findByStartDateGreaterThan(startDate);
    }
}
