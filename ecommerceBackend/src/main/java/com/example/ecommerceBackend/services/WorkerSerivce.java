package com.example.ecommerceBackend.services;

import com.example.ecommerceBackend.entities.WorkerEntity;
import com.example.ecommerceBackend.requests.CreateWorkerRequest;

import java.util.List;

public interface WorkerSerivce {
    List<WorkerEntity> getAllWorkers();
    WorkerEntity createWorker(CreateWorkerRequest createWorkerRequest);

    void deleteWorker(Long workerId);
}
