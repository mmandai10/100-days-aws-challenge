package com.example.taskservice;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    
    // ステータスでタスクを検索
    List<Task> findByStatus(String status);
    
    // 担当者でタスクを検索
    List<Task> findByAssignedUserId(String assignedUserId);
    
    // 期限切れタスクを検索（RDSの強み：複雑なクエリ）
    List<Task> findByDueDateBeforeAndStatusNot(LocalDateTime date, String status);
}