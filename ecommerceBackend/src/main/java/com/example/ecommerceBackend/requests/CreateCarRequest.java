package com.example.ecommerceBackend.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.java.Log;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Log
public class CreateCarRequest {
    private String brand;
    private String model;
    private String registration;
    private Date insurance;
    private Date service;
}
