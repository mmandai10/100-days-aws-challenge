package com.example.taskservice;

import org.springframework.context.annotation.Configuration;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

@Configuration
@EnableRedisHttpSession(maxInactiveIntervalInSeconds = 1800) // 30分
public class SessionConfig {
    // Spring Session を Redis で管理する設定
    // この1つのアノテーションで、セッションが自動的にRedisに保存される
}