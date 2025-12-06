package com.example.userservice;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.enhanced.dynamodb.Key;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class UserService {

    private final DynamoDbTable<User> userTable;
    private final RedisTemplate<String, Object> redisTemplate;
    private static final String CACHE_PREFIX = "user:";
    private static final long CACHE_TTL_MINUTES = 10;

    public UserService(DynamoDbEnhancedClient enhancedClient, RedisTemplate<String, Object> redisTemplate) {
        this.userTable = enhancedClient.table("day27-users", TableSchema.fromBean(User.class));
        this.redisTemplate = redisTemplate;
    }

    public User createUser(User user) {
        user.setCreatedAt(LocalDateTime.now().toString());
        userTable.putItem(user);
        cacheUser(user);
        return user;
    }

    public User getUser(String userId) {
        User cachedUser = getUserFromCache(userId);
        if (cachedUser != null) {
            System.out.println("Cache HIT for user: " + userId);
            return cachedUser;
        }

        System.out.println("Cache MISS for user: " + userId);
        Key key = Key.builder().partitionValue(userId).build();
        User user = userTable.getItem(key);

        if (user != null) {
            cacheUser(user);
        }

        return user;
    }

    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();
        userTable.scan().items().forEach(users::add);
        return users;
    }

    public void deleteUser(String userId) {
        Key key = Key.builder().partitionValue(userId).build();
        userTable.deleteItem(key);
        redisTemplate.delete(CACHE_PREFIX + userId);
    }

    private void cacheUser(User user) {
        try {
            String cacheKey = CACHE_PREFIX + user.getUserId();
            redisTemplate.opsForValue().set(cacheKey, user, CACHE_TTL_MINUTES, TimeUnit.MINUTES);
        } catch (Exception e) {
            System.out.println("Redis cache write failed: " + e.getMessage());
        }
    }

    private User getUserFromCache(String userId) {
        try {
            String cacheKey = CACHE_PREFIX + userId;
            Object cached = redisTemplate.opsForValue().get(cacheKey);
            if (cached != null) {
                if (cached instanceof User) {
                    return (User) cached;
                }
                @SuppressWarnings("unchecked")
                java.util.Map<String, Object> map = (java.util.Map<String, Object>) cached;
                User user = new User();
                user.setUserId((String) map.get("userId"));
                user.setName((String) map.get("name"));
                user.setEmail((String) map.get("email"));
                user.setDepartment((String) map.get("department"));
                user.setCreatedAt((String) map.get("createdAt"));
                return user;
            }
        } catch (Exception e) {
            System.out.println("Redis cache read failed: " + e.getMessage());
        }
        return null;
    }
}