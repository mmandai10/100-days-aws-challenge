package com.aws100days.day23;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, String> {
    
    // ステータスでタスクを検索（JPAが自動でSQLを生成）
    List<Task> findByStatus(String status);
    
    // タイトルに含まれるキーワードで検索
    List<Task> findByTitleContaining(String keyword);
}