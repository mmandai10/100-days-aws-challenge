package com.example.userservice;

import org.springframework.stereotype.Service;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.enhanced.dynamodb.Key;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private final DynamoDbTable<User> userTable;

    public UserService(DynamoDbEnhancedClient enhancedClient) {
        this.userTable = enhancedClient.table("day27-users", TableSchema.fromBean(User.class));
    }

    // ユーザー作成
    public User createUser(User user) {
        user.setCreatedAt(LocalDateTime.now().toString());
        userTable.putItem(user);
        return user;
    }

    // ユーザー取得（高速！DynamoDBの強み）
    public User getUser(String userId) {
        Key key = Key.builder().partitionValue(userId).build();
        return userTable.getItem(key);
    }

    // 全ユーザー取得
    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();
        userTable.scan().items().forEach(users::add);
        return users;
    }

    // ユーザー削除
    public void deleteUser(String userId) {
        Key key = Key.builder().partitionValue(userId).build();
        userTable.deleteItem(key);
    }
}