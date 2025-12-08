package com.example.taskservice;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * セッションベースの認証API
 * Day 25のJWT認証との比較用
 */
@RestController
@RequestMapping("/api/session")
public class SessionAuthController {
    
    private static final String SESSION_USER_KEY = "currentUser";
    
    /**
     * ログイン - セッション作成
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(
            @RequestBody Map<String, String> credentials,
            HttpSession session) {
        
        String username = credentials.get("username");
        String password = credentials.get("password");
        
        // 簡易認証（本番ではDBで検証）
        if (username != null && password != null && password.equals("password123")) {
            
            // セッションにユーザー情報を保存 → 自動的にRedisに保存される
            UserSession userSession = new UserSession(
                "user-" + System.currentTimeMillis(),
                username,
                "USER"
            );
            session.setAttribute(SESSION_USER_KEY, userSession);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("sessionId", session.getId());
            response.put("user", username);
            response.put("expiresIn", "30 minutes");
            
            return ResponseEntity.ok(response);
        }
        
        Map<String, Object> error = new HashMap<>();
        error.put("error", "Invalid credentials");
        return ResponseEntity.status(401).body(error);
    }
    
    /**
     * 現在のセッション情報取得
     */
    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getCurrentUser(HttpSession session) {
        
        UserSession userSession = (UserSession) session.getAttribute(SESSION_USER_KEY);
        
        if (userSession == null) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Not logged in");
            error.put("sessionId", session.getId());
            return ResponseEntity.status(401).body(error);
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("userId", userSession.getUserId());
        response.put("username", userSession.getUsername());
        response.put("role", userSession.getRole());
        response.put("sessionId", session.getId());
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * ログアウト - セッション削除
     */
    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpSession session) {
        
        // セッションを無効化 → Redisからも削除される
        session.invalidate();
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Logout successful");
        
        return ResponseEntity.ok(response);
    }
}