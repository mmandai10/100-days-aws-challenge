package com.example.secureapi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/test")
public class TestController {
    
    @GetMapping("/public")
    public ResponseEntity<Map<String, String>> publicEndpoint() {
        return ResponseEntity.ok(Map.of("message", "This is a public endpoint"));
    }
    
    @GetMapping("/secure")
    public ResponseEntity<Map<String, String>> secureEndpoint(Authentication authentication) {
        return ResponseEntity.ok(Map.of(
            "message", "This is a secure endpoint",
            "user", authentication.getName()
        ));
    }
}
