package com.example.ecommerceBackend.services;

import com.example.ecommerceBackend.entities.WorkerEntity;
import com.example.ecommerceBackend.repositories.WorkerRepository;
import com.example.ecommerceBackend.requests.CreateWorkerRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Log
public class WorkerServiceImpl implements WorkerSerivce{

    private final WorkerRepository workerRepository;
    @Override
    public List<WorkerEntity> getAllWorkers() {
        return workerRepository.findAll();
    }

    @Override
    public WorkerEntity createWorker(CreateWorkerRequest createWorkerRequest) {
        ModelMapper modelMapper = new ModelMapper();
        PropertyMap<CreateWorkerRequest, WorkerEntity> workerMap = new PropertyMap<CreateWorkerRequest, WorkerEntity>() {
            @Override
            protected void configure() {
                map().setId(null);
                map().setWorkerId(source.getWorkerId());
                map().setAgreement(source.getAgreement());
                map().setInsurance(source.getInsurance());
            }
        };

        modelMapper.addMappings(workerMap);
        WorkerEntity workerEntity = modelMapper.map(createWorkerRequest, WorkerEntity.class);

        return workerRepository.save(workerEntity);
    }

    @Override
    public void deleteWorker(Long workerId) {
        workerRepository.deleteById(workerId);
    }
}
