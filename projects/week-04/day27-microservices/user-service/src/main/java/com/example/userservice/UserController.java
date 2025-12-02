package com.example.userservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // ヘルスチェック
    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of(
            "service", "user-service",
            "status", "UP",
            "port", "8082",
            "database", "DynamoDB"
        );
    }

    // 全ユーザー取得
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // ユーザー作成
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    // ID指定でユーザー取得（DynamoDBの強み：超高速！）
    @GetMapping("/{userId}")
    public ResponseEntity<User> getUser(@PathVariable String userId) {
        User user = userService.getUser(userId);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }

    // ユーザー削除
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable String userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok().build();
    }
}