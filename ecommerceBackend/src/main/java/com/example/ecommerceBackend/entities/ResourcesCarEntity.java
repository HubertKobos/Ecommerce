package com.example.ecommerceBackend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ResourcesCarEntity {
    @Id
    @GeneratedValue
    private Long id;
    private String brand;
    private String model;
    private String registration;
    private Date insurance;
    private Date service;
}
