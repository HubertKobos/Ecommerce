package com.example.ecommerceBackend.controllers;

import com.example.ecommerceBackend.entities.ResourcesCarEntity;
import com.example.ecommerceBackend.requests.CreateCarRequest;
import com.example.ecommerceBackend.services.ResourcesCarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/car")
@RequiredArgsConstructor
@Log
public class ResourcesCarController {
    private final ResourcesCarService resourcesCarService;
    @GetMapping
    public ResponseEntity<List<ResourcesCarEntity>> getAllResourceCars(){
        List<ResourcesCarEntity> cars = resourcesCarService.getAllResourceCars();
        return ResponseEntity.ok(cars);
    }
    @PostMapping
    public ResponseEntity<ResourcesCarEntity> createResourceCar(@RequestBody CreateCarRequest createCarRequest){
        ResourcesCarEntity resourcesCarEntity = resourcesCarService.createNewCar(createCarRequest);
        return ResponseEntity.ok(resourcesCarEntity);
    }

    @DeleteMapping("/{carId}")
    public ResponseEntity<Void> deleteCarById(@PathVariable Long carId){
        resourcesCarService.deleteCar(carId);
        return ResponseEntity.ok().build();
    }
}
