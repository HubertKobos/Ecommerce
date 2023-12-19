//package com.example.ecommerceBackend.controllers;
//
//import com.example.ecommerceBackend.config.JwtAuthenticationFilter;
//import com.example.ecommerceBackend.entities.UserEntity;
//import com.example.ecommerceBackend.repositories.UserRepository;
//import com.example.ecommerceBackend.requests.AuthenticationRequest;
//import com.example.ecommerceBackend.requests.RegisterRequest;
//import com.example.ecommerceBackend.responses.AuthenticationResponse;
//import com.example.ecommerceBackend.services.AuthenticationService;
//import com.example.ecommerceBackend.services.JwtService;
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.context.annotation.Import;
//import org.springframework.http.MediaType;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.test.web.servlet.MockMvc;
//
//import static org.mockito.Mockito.when;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@RunWith(SpringRunner.class)
//@WebMvcTest(AuthenticationController.class)
//public class AuthControllerTests {
//    @Autowired
//    private MockMvc mockMvc;
//    @MockBean
//    private JwtService jwtService;
//    @MockBean
//    private AuthenticationService authenticationService;
//    @MockBean
//    private UserRepository userRepository;
//
//    @Test
//    public void testRegister() throws Exception {
//        // Przygotowanie danych do testu
//        RegisterRequest registerRequest = new RegisterRequest("test@email.com", "password");
//
//        // Mockowanie zachowania UserRepository
//        when(userRepository.existsByEmail(registerRequest.getEmail())).thenReturn(false);
//
//        // Mockowanie zachowania AuthenticationService
//        AuthenticationResponse expectedResponse = new AuthenticationResponse("test@email.com", "jwtToken");
//        when(authenticationService.register(registerRequest)).thenReturn(expectedResponse);
//
//        // Wywołanie kontrolera za pomocą MockMvc
//        mockMvc.perform(post("/api/auth/register")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(asJsonString(registerRequest)))
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andExpect(jsonPath("$.email").value(expectedResponse.getEmail()))
//                .andExpect(jsonPath("$.token").value(expectedResponse.getToken()));
//    }
//
//    @Test
//    public void testAuthenticate() throws Exception {
//        // Przygotowanie danych do testu
//        AuthenticationRequest authenticationRequest = new AuthenticationRequest("test@email.com", "password");
//
//        UserEntity userEntity = UserEntity.builder().email("test@email.com").password("password").build();
//        when(userRepository.save(userEntity)).thenReturn(userEntity);
//
//        // Mockowanie zachowania UserRepository
//        when(userRepository.existsByEmail(authenticationRequest.getEmail())).thenReturn(true);
//
//        // Mockowanie zachowania AuthenticationService
//        AuthenticationResponse expectedResponse = new AuthenticationResponse(null, "jwtToken");
//        when(authenticationService.authenticate(authenticationRequest)).thenReturn(expectedResponse);
//
//        // Wywołanie kontrolera za pomocą MockMvc
//        mockMvc.perform(post("/api/auth/authenticate")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(asJsonString(authenticationRequest)))
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andExpect(jsonPath("$.token").value(expectedResponse.getToken()));
//    }
//
//    // Metoda pomocnicza do konwersji obiektu na JSON
//    private static String asJsonString(Object obj) throws JsonProcessingException {
//        ObjectMapper objectMapper = new ObjectMapper();
//        return objectMapper.writeValueAsString(obj);
//    }
//
//}
