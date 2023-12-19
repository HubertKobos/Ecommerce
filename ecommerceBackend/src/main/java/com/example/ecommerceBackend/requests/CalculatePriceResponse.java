package com.example.ecommerceBackend.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CalculatePriceResponse {
    private List<Long> productIds;
    private List<Integer> qty;
}
