package com.example.taskservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskService taskService;  // ← 新規追加！

    // ヘルスチェック
    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of(
            "service", "task-service",
            "status", "UP",
            "port", "8081",
            "database", "RDS (MySQL)"
        );
    }

    // 全タスク取得
    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // ⭐ 全タスク取得（ユーザー情報付き）← 新規追加！
    @GetMapping("/with-users")
    public List<TaskWithUserDTO> getAllTasksWithUsers() {
        return taskService.getAllTasksWithUsers();
    }

    // タスク作成
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }

    // ID指定でタスク取得
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTask(@PathVariable Long id) {
        return taskRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ⭐ ID指定でタスク取得（ユーザー情報付き）← 新規追加！
    @GetMapping("/{id}/with-user")
    public ResponseEntity<TaskWithUserDTO> getTaskWithUser(@PathVariable Long id) {
        try {
            TaskWithUserDTO taskWithUser = taskService.getTaskWithUser(id);
            return ResponseEntity.ok(taskWithUser);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ステータスで絞り込み
    @GetMapping("/status/{status}")
    public List<Task> getTasksByStatus(@PathVariable String status) {
        return taskRepository.findByStatus(status);
    }

    // ユーザーIDで絞り込み
    @GetMapping("/user/{userId}")
    public List<Task> getTasksByUser(@PathVariable String userId) {
        return taskRepository.findByAssignedUserId(userId);
    }

    // 期限切れタスク取得
    @GetMapping("/overdue")
    public List<Task> getOverdueTasks() {
        return taskRepository.findByDueDateBeforeAndStatusNot(
            LocalDateTime.now(),
            "COMPLETED"
        );
    }

    // タスク更新
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        return taskRepository.findById(id)
            .map(task -> {
                task.setTitle(taskDetails.getTitle());
                task.setDescription(taskDetails.getDescription());
                task.setStatus(taskDetails.getStatus());
                task.setAssignedUserId(taskDetails.getAssignedUserId());
                task.setDueDate(taskDetails.getDueDate());
                return ResponseEntity.ok(taskRepository.save(task));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    // タスク削除
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        return taskRepository.findById(id)
            .map(task -> {
                taskRepository.delete(task);
                return ResponseEntity.ok().<Void>build();
            })
            .orElse(ResponseEntity.notFound().build());
    }
}