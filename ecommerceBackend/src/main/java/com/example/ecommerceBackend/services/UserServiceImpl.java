package com.example.ecommerceBackend.services;

import com.example.ecommerceBackend.entities.UserEntity;
import com.example.ecommerceBackend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Log
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Override
    public Optional<UserEntity> getUser(UUID userId) {
        Optional<UserEntity> optionalUser = userRepository.findById(userId);
        return optionalUser;
    }

    @Override
    public void updateUser(UserEntity user) {
        userRepository.save(user);
    }

    @Override
    public UserEntity saveUser(UserEntity user) {
        return userRepository.save(user);
    }

    @Override
    public Optional<UserEntity> findById(UUID id) {
        return userRepository.findById(id);
    }

    @Override
    public boolean isPasswordMatch(String currentPasswordRaw, String currentPasswordEncoded) {
        return passwordEncoder.matches(currentPasswordRaw, currentPasswordEncoded);
    }

    @Override
    public void setNewPassword(UserEntity userEntity, String newPassword) {
        userEntity.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(userEntity);
    }
}
