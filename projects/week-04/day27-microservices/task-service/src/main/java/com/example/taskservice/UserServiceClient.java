package com.example.taskservice;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class UserServiceClient {

    private final RestTemplate restTemplate;

    @Value("${user.service.url:http://localhost:8082}")
    private String userServiceUrl;

    public UserServiceClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Cacheable(value = "users", key = "#userId")
    @CircuitBreaker(name = "userService", fallbackMethod = "fallbackGetUser")
    public UserDTO getUser(String userId) {
        if (userId == null || userId.isEmpty()) {
            return null;
        }
        String url = userServiceUrl + "/users/" + userId;
        System.out.println("[Cache MISS] Calling User Service: " + url);
        return restTemplate.getForObject(url, UserDTO.class);
    }

    public UserDTO fallbackGetUser(String userId, Throwable t) {
        System.err.println("[CircuitBreaker] FALLBACK! User Service unavailable: " + t.getMessage());
        UserDTO fallback = new UserDTO();
        fallback.setId(userId);
        fallback.setName("Unknown (Service Unavailable)");
        fallback.setEmail("N/A");
        return fallback;
    }
}