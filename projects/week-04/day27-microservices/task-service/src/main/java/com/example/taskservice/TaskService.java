package com.example.taskservice;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserServiceClient userServiceClient;

    public TaskService(TaskRepository taskRepository, UserServiceClient userServiceClient) {
        this.taskRepository = taskRepository;
        this.userServiceClient = userServiceClient;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found: " + id));
    }

    public TaskWithUserDTO getTaskWithUser(Long id) {
        Task task = getTaskById(id);
        UserDTO user = userServiceClient.getUser(task.getAssignedUserId());
        return new TaskWithUserDTO(task, user);
    }

    public List<TaskWithUserDTO> getAllTasksWithUsers() {
        List<Task> tasks = taskRepository.findAll();
        return tasks.stream()
                .map(task -> {
                    UserDTO user = userServiceClient.getUser(task.getAssignedUserId());
                    return new TaskWithUserDTO(task, user);
                })
                .collect(Collectors.toList());
    }
}