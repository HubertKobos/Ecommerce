package com.example.ecommerceBackend.services;

import com.example.ecommerceBackend.entities.ResourcesCarEntity;
import com.example.ecommerceBackend.requests.CreateCarRequest;

import java.util.List;

public interface ResourcesCarService {
    List<ResourcesCarEntity> getAllResourceCars();
    ResourcesCarEntity createNewCar(CreateCarRequest createCarRequest);

    void deleteCar(Long carId);
}
