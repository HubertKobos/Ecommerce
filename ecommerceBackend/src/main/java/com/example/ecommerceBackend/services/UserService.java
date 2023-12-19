package com.example.ecommerceBackend.services;

import com.example.ecommerceBackend.entities.UserEntity;

import java.util.Optional;
import java.util.UUID;

public interface UserService {
    Optional<UserEntity> getUser(UUID userId);
    void updateUser(UserEntity user);
    UserEntity saveUser(UserEntity user);
    Optional<UserEntity> findById(UUID id);
    boolean isPasswordMatch(String currentPasswordRaw, String currentPasswordEncoded);

    void setNewPassword(UserEntity userEntity, String newPassword);
}
