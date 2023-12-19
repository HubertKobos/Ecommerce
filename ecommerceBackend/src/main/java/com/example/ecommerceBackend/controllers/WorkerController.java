package com.example.ecommerceBackend.controllers;

import com.example.ecommerceBackend.entities.WorkerEntity;
import com.example.ecommerceBackend.requests.CreateWorkerRequest;
import com.example.ecommerceBackend.services.WorkerSerivce;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/worker")
@RequiredArgsConstructor
@Log
public class WorkerController {
    private final WorkerSerivce workerSerivce;
    @GetMapping
    public ResponseEntity<List<WorkerEntity>> getAllWorkers(){
        List<WorkerEntity> workers = workerSerivce.getAllWorkers();
        return ResponseEntity.ok(workers);
    }
    @PostMapping
    public ResponseEntity<WorkerEntity> createWorker(@RequestBody CreateWorkerRequest createWorkerRequest){
        WorkerEntity worker = workerSerivce.createWorker(createWorkerRequest);
        return ResponseEntity.ok(worker);
    }
    @DeleteMapping("/{workerId}")
    public ResponseEntity<Void> deleteWorkerById(@PathVariable Long workerId){
        workerSerivce.deleteWorker(workerId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
