package com.example.taskapi;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    
    @GetMapping("/hello")
    public String hello() {
        return "Hello from Spring Boot + RDS!";
    }
    
    @GetMapping("/")
    public String home() {
        return "Task API is running! Go to /hello";
    }
}
