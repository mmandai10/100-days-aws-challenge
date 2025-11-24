package com.aws100days.day23;

import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    // メモリ内データストア（ArrayList）
    private List<Task> tasks = new ArrayList<>();

    // コンストラクタ - 初期データを追加
    public TaskService() {
        tasks.add(new Task("Spring Bootを学ぶ", "Day 23の課題"));
        tasks.add(new Task("REST APIを理解する", "CRUD操作を実装"));
    }

    // 全タスク取得
    public List<Task> getAllTasks() {
        return tasks;
    }

    // IDでタスク取得
    public Optional<Task> getTaskById(String id) {
        return tasks.stream()
                .filter(task -> task.getId().equals(id))
                .findFirst();
    }

    // タスク作成
    public Task createTask(Task task) {
        tasks.add(task);
        return task;
    }

    // タスク更新
    public Optional<Task> updateTask(String id, Task updatedTask) {
        Optional<Task> existingTask = getTaskById(id);
        
        if (existingTask.isPresent()) {
            Task task = existingTask.get();
            task.setTitle(updatedTask.getTitle());
            task.setDescription(updatedTask.getDescription());
            task.setStatus(updatedTask.getStatus());
            return Optional.of(task);
        }
        
        return Optional.empty();
    }

    // タスク削除
    public boolean deleteTask(String id) {
        return tasks.removeIf(task -> task.getId().equals(id));
    }

    // ステータスでフィルター
    public List<Task> getTasksByStatus(String status) {
        return tasks.stream()
                .filter(task -> task.getStatus().equals(status))
                .toList();
    }
}