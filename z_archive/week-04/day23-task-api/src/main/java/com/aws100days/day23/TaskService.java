package com.aws100days.day23;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    
    private final TaskRepository taskRepository;
    
    // コンストラクタインジェクション（依存性注入）
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }
    
    // 全タスク取得
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
    
    // ID でタスク取得
    public Optional<Task> getTaskById(String id) {
        return taskRepository.findById(id);
    }
    
    // ステータスでタスク取得
    public List<Task> getTasksByStatus(String status) {
        return taskRepository.findByStatus(status);
    }
    
    // タスク作成
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }
    
    // タスク更新
    public Task updateTask(String id, Task updatedTask) {
        return taskRepository.findById(id)
            .map(task -> {
                task.setTitle(updatedTask.getTitle());
                task.setDescription(updatedTask.getDescription());
                task.setStatus(updatedTask.getStatus());
                return taskRepository.save(task);
            })
            .orElseThrow(() -> new RuntimeException("Task not found: " + id));
    }
    
    // タスク削除
    public void deleteTask(String id) {
        taskRepository.deleteById(id);
    }
}