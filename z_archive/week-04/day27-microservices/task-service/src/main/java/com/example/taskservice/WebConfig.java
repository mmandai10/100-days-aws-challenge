package com.example.taskservice;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Web Config
 * API Gateway Cognito Authorizer handles authentication
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {
    // SessionInterceptor disabled - using API Gateway authentication
}