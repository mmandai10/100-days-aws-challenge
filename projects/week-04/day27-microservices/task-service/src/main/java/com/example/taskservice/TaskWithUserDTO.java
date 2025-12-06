package com.example.taskservice;

import java.time.LocalDateTime;

public class TaskWithUserDTO {
    
    // Task情報
    private Long id;
    private String title;
    private String description;
    private String status;
    private LocalDateTime dueDate;
    private LocalDateTime createdAt;
    
    // User情報（User Serviceから取得）
    private String assignedUserId;
    private String assignedUserName;  // ← これが今日の目玉！
    private String assignedUserEmail;

    // デフォルトコンストラクタ
    public TaskWithUserDTO() {}

    // TaskとUserDTOから作成するコンストラクタ
    public TaskWithUserDTO(Task task, UserDTO user) {
        this.id = task.getId();
        this.title = task.getTitle();
        this.description = task.getDescription();
        this.status = task.getStatus();
        this.dueDate = task.getDueDate();
        this.createdAt = task.getCreatedAt();
        this.assignedUserId = task.getAssignedUserId();
        
        if (user != null) {
            this.assignedUserName = user.getName();
            this.assignedUserEmail = user.getEmail();
        } else {
            this.assignedUserName = "Unknown User";
            this.assignedUserEmail = null;
        }
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getDueDate() { return dueDate; }
    public void setDueDate(LocalDateTime dueDate) { this.dueDate = dueDate; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getAssignedUserId() { return assignedUserId; }
    public void setAssignedUserId(String assignedUserId) { this.assignedUserId = assignedUserId; }

    public String getAssignedUserName() { return assignedUserName; }
    public void setAssignedUserName(String assignedUserName) { this.assignedUserName = assignedUserName; }

    public String getAssignedUserEmail() { return assignedUserEmail; }
    public void setAssignedUserEmail(String assignedUserEmail) { this.assignedUserEmail = assignedUserEmail; }
}
