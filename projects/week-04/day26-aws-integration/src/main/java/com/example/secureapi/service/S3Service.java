package com.example.secureapi.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import java.io.IOException;
import java.util.UUID;

@Service
public class S3Service {

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    @Value("${aws.s3.region}")
    private String region;

    private S3Client s3Client;

    @PostConstruct
    public void init() {
        this.s3Client = S3Client.builder()
                .region(Region.of(region))
                .build();
        System.out.println("✅ S3Client initialized for bucket: " + bucketName);
    }

    @PreDestroy
    public void cleanup() {
        if (s3Client != null) {
            s3Client.close();
        }
    }

    /**
     * ファイルをS3にアップロード
     * @param file アップロードするファイル
     * @param folder 保存先フォルダ（例: "attachments"）
     * @return S3上のファイルキー
     */
    public String uploadFile(MultipartFile file, String folder) {
        String originalFilename = file.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        
        // ユニークなファイル名を生成
        String key = folder + "/" + UUID.randomUUID().toString() + extension;

        try {
            PutObjectRequest request = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .contentType(file.getContentType())
                    .build();

            s3Client.putObject(request, RequestBody.fromBytes(file.getBytes()));
            
            System.out.println("✅ File uploaded to S3: " + key);
            return key;
            
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file to S3: " + e.getMessage(), e);
        }
    }

    /**
     * S3ファイルのURLを取得
     * @param key S3上のファイルキー
     * @return ファイルのURL
     */
    public String getFileUrl(String key) {
        return String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, region, key);
    }

    /**
     * S3からファイルを削除
     * @param key S3上のファイルキー
     */
    public void deleteFile(String key) {
        DeleteObjectRequest request = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();

        s3Client.deleteObject(request);
        System.out.println("✅ File deleted from S3: " + key);
    }
}