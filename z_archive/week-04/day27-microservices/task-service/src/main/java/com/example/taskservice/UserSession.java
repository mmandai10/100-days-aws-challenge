package com.example.taskservice;

import java.io.Serializable;

/**
 * セッションに保存するユーザー情報
 * Redisに保存するため、Serializableが必要
 */
public class UserSession implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    private String userId;
    private String username;
    private String role;
    
    public UserSession() {}
    
    public UserSession(String userId, String username, String role) {
        this.userId = userId;
        this.username = username;
        this.role = role;
    }
    
    // Getters
    public String getUserId() { return userId; }
    public String getUsername() { return username; }
    public String getRole() { return role; }
    
    // Setters
    public void setUserId(String userId) { this.userId = userId; }
    public void setUsername(String username) { this.username = username; }
    public void setRole(String role) { this.role = role; }
}