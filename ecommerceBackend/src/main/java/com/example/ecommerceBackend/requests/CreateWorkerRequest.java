package com.example.ecommerceBackend.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CreateWorkerRequest {
    private String workerId;
    private Date insurance;
    private Date agreement;
}
