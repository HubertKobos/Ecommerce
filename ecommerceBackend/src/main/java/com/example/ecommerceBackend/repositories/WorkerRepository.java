package com.example.ecommerceBackend.repositories;

import com.example.ecommerceBackend.entities.WorkerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkerRepository extends JpaRepository<WorkerEntity, Long> {
}
