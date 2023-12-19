package com.example.ecommerceBackend.repositories;

import com.example.ecommerceBackend.entities.CalendarOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface CalendarOrderRepository extends JpaRepository<CalendarOrder, Long> {
    List<CalendarOrder> findByStartDateGreaterThan(Date date);
}
