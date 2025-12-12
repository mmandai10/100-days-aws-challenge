package com.aws100days.day22;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
public class HelloController {

    @GetMapping("/")
    public Map<String, String> home() {
        return Map.of(
            "message", "Welcome to Spring Boot!",
            "status", "running",
            "framework", "Spring Boot 3.5.7"
        );
    }

    @GetMapping("/hello")
    public Map<String, String> hello() {
        return Map.of(
            "message", "Hello from Spring Boot!",
            "day", "Day 22",
            "technology", "Java 17 + Spring Boot"
        );
    }

    @GetMapping("/api/info")
    public Map<String, Object> info() {
        return Map.of(
            "application", "100 Days AWS Challenge",
            "day", 22,
            "topic", "Spring Boot Basics",
            "comparison", Map.of(
                "previous", "Node.js + Express",
                "current", "Java + Spring Boot"
            )
        );
    }
}