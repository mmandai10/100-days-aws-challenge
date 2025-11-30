package com.example.secureapi.config;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import org.springframework.boot.jdbc.DataSourceBuilder;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.secretsmanager.SecretsManagerClient;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueRequest;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueResponse;

import javax.sql.DataSource;

@Configuration
@Profile("aws")  // "aws"繝励Ο繝輔ぃ繧､繝ｫ譎ゅ・縺ｿ譛牙柑
public class SecretsManagerConfig {

    @Value("${aws.secretsmanager.secretName:day26/rds/taskdb-credentials}")
    private String secretName;

    @Value("${aws.region:ap-northeast-1}")
    private String region;

    @Bean
    @Primary
    public DataSource dataSource() {
        // Secrets Manager縺九ｉ隱崎ｨｼ諠・ｱ繧貞叙蠕・
        String secret = getSecret();
        
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode secretJson = mapper.readTree(secret);
            
            String host = secretJson.get("host").asText();
            String port = secretJson.get("port").asText();
            String dbname = secretJson.get("dbname").asText();
            String username = secretJson.get("username").asText();
            String password = secretJson.get("password").asText();
            
            String jdbcUrl = String.format("jdbc:mysql://%s:%s/%s", host, port, dbname);
            
            System.out.println("笨・Secrets Manager縺九ｉ隱崎ｨｼ諠・ｱ繧貞叙蠕励＠縺ｾ縺励◆");
            System.out.println("   Host: " + host);
            System.out.println("   Database: " + dbname);
            
            return DataSourceBuilder.create()
                    .driverClassName("com.mysql.cj.jdbc.Driver")
                    .url(jdbcUrl)
                    .username(username)
                    .password(password)
                    .build();
                    
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse secret: " + e.getMessage(), e);
        }
    }

    private String getSecret() {
        SecretsManagerClient client = SecretsManagerClient.builder()
                .region(Region.of(region))
                .build();

        GetSecretValueRequest request = GetSecretValueRequest.builder()
                .secretId(secretName)
                .build();

        try {
            GetSecretValueResponse response = client.getSecretValue(request);
            return response.secretString();
        } catch (Exception e) {
            throw new RuntimeException("Failed to retrieve secret: " + e.getMessage(), e);
        } finally {
            client.close();
        }
    }
}