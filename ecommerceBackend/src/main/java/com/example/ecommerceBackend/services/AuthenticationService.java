package com.example.ecommerceBackend.services;

import com.example.ecommerceBackend.entities.enums.Role;
import com.example.ecommerceBackend.entities.UserEntity;
import com.example.ecommerceBackend.repositories.UserRepository;
import com.example.ecommerceBackend.requests.AuthenticationRequest;
import com.example.ecommerceBackend.requests.RegisterRequest;
import com.example.ecommerceBackend.responses.AuthenticationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest registerRequest) {
        var user = UserEntity.builder()
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(Role.USER)
                .build();

        UserEntity savedUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .email(registerRequest.getEmail())
                .role(savedUser.getRole())
                .id(savedUser.getId())
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse registerAdmin(RegisterRequest registerRequest) {
        var user = UserEntity.builder()
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(Role.ADMIN)
                .build();

        UserEntity savedUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .email(registerRequest.getEmail())
                .role(savedUser.getRole())
                .id(savedUser.getId())
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse registerManager(RegisterRequest registerRequest) {
        var user = UserEntity.builder()
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(Role.MANAGER)
                .build();

        UserEntity savedUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .email(registerRequest.getEmail())
                .role(savedUser.getRole())
                .id(savedUser.getId())
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getEmail(),
                        authenticationRequest.getPassword()
                )
        );
        var user = userRepository.findByEmail(authenticationRequest.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .email(authenticationRequest.getEmail())
                .role(user.getRole())
                .id(user.getId())
                .token(jwtToken)
                .build();
    }
}
