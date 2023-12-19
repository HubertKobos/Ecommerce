package com.example.ecommerceBackend.services;

import com.example.ecommerceBackend.entities.ResourcesCarEntity;
import com.example.ecommerceBackend.repositories.ResourcesCarRepository;
import com.example.ecommerceBackend.requests.CreateCarRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
@Log
public class ResourcesCarServiceImpl implements ResourcesCarService{
    private final ResourcesCarRepository resourcesCarRepository;
    @Override
    public List<ResourcesCarEntity> getAllResourceCars() {
        List<ResourcesCarEntity> resourcesCars = resourcesCarRepository.findAll();
        return resourcesCars;
    }

    @Override
    public ResourcesCarEntity createNewCar(CreateCarRequest createCarRequest) {
        ModelMapper modelMapper = new ModelMapper();
        ResourcesCarEntity resourcesCarEntity = modelMapper.map(createCarRequest, ResourcesCarEntity.class);
        return resourcesCarRepository.save(resourcesCarEntity);
    }

    @Override
    public void deleteCar(Long carId) {
        resourcesCarRepository.deleteById(carId);
    }
}
