package com.example.ecommerceBackend.controllers;

import com.example.ecommerceBackend.entities.UserEntity;
import com.example.ecommerceBackend.exceptions.userExceptions.UserExistsException;
import com.example.ecommerceBackend.exceptions.userExceptions.UserNotExistsException;
import com.example.ecommerceBackend.repositories.UserRepository;
import com.example.ecommerceBackend.requests.AuthenticationRequest;
import com.example.ecommerceBackend.requests.ChangePasswordRequest;
import com.example.ecommerceBackend.requests.RegisterRequest;
import com.example.ecommerceBackend.responses.AuthenticationResponse;
import com.example.ecommerceBackend.services.AuthenticationService;
import com.example.ecommerceBackend.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Log
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;
    private final UserService userService;
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest registerRequest){
        if(userRepository.existsByEmail(registerRequest.getEmail())){
            throw new UserExistsException(String.format("User with email %s already exists", registerRequest.getEmail()), HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(authenticationService.register(registerRequest));
    }

    @PostMapping("/register/admin")
    public ResponseEntity<AuthenticationResponse> registerAdmin(@RequestBody RegisterRequest registerRequest){
        if(userRepository.existsByEmail(registerRequest.getEmail())){
            throw new UserExistsException(String.format("User with email %s already exists", registerRequest.getEmail()), HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(authenticationService.registerAdmin(registerRequest));
    }

    @PostMapping("register/manager")
    public ResponseEntity<AuthenticationResponse> registerManager(@RequestBody RegisterRequest registerRequest){
        if(userRepository.existsByEmail(registerRequest.getEmail())){
            throw new UserExistsException(String.format("User with email %s already exists", registerRequest.getEmail()), HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(authenticationService.registerManager(registerRequest));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest authenticationRequest){
        if(!userRepository.existsByEmail(authenticationRequest.getEmail())){
            throw new UserNotExistsException(String.format("User with email %s not exists", authenticationRequest.getEmail()), HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(authenticationService.authenticate(authenticationRequest));
    }

    @PostMapping("/password")
    public ResponseEntity<Void> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest){
        Optional<UserEntity> user = userService.findById(changePasswordRequest.getId());
        if(user.isPresent() && userService.isPasswordMatch(changePasswordRequest.getOldPassword(), user.get().getPassword())){
            userService.setNewPassword(user.get(), changePasswordRequest.getNewPassword());
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok().build();
    }
}
