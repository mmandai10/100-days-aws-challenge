package com.example.taskservice;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

/**
 * セッション認証インターセプター
 * 保護されたエンドポイントへのアクセスをチェック
 */
@Component
public class SessionInterceptor implements HandlerInterceptor {

    private static final String SESSION_USER_KEY = "currentUser";

    @Override
    public boolean preHandle(HttpServletRequest request, 
                            HttpServletResponse response, 
                            Object handler) throws Exception {
        
        HttpSession session = request.getSession(false);
        
        // セッションがない、またはユーザー情報がない場合
        if (session == null || session.getAttribute(SESSION_USER_KEY) == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"Please login first\"}");
            return false; // リクエストを中断
        }
        
        return true; // 処理続行
    }
}