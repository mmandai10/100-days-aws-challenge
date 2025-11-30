package com.example.secureapi.service;

import com.example.secureapi.dto.AuthResponse;
import com.example.secureapi.dto.LoginRequest;
import com.example.secureapi.dto.RegisterRequest;
import com.example.secureapi.entity.Role;
import com.example.secureapi.entity.User;
import com.example.secureapi.repository.UserRepository;
import com.example.secureapi.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);
        
        userRepository.save(user);
        
        String token = jwtUtil.generateToken(user.getUsername());
        return new AuthResponse(token, user.getUsername());
    }
    
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        
        String token = jwtUtil.generateToken(request.getUsername());
        return new AuthResponse(token, request.getUsername());
    }
}
