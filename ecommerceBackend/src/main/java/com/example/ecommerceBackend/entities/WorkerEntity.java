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
public class WorkerEntity {
    @Id
    @GeneratedValue
    private Long id;
    private String workerId;
    private Date insurance;
    private Date agreement;
}
