package com.example.secureapi.controller;

import com.example.secureapi.service.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/files")
public class FileController {

    @Autowired
    private S3Service s3Service;

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(
            @RequestParam("file") MultipartFile file) {
        
        if (file.isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "File is empty");
            return ResponseEntity.badRequest().body(error);
        }

        // S3にアップロード
        String key = s3Service.uploadFile(file, "attachments");
        String url = s3Service.getFileUrl(key);

        Map<String, String> response = new HashMap<>();
        response.put("message", "File uploaded successfully");
        response.put("key", key);
        response.put("url", url);
        response.put("filename", file.getOriginalFilename());
        response.put("size", String.valueOf(file.getSize()));

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{key}")
    public ResponseEntity<Map<String, String>> deleteFile(
            @PathVariable String key) {
        
        s3Service.deleteFile("attachments/" + key);

        Map<String, String> response = new HashMap<>();
        response.put("message", "File deleted successfully");
        response.put("key", key);

        return ResponseEntity.ok(response);
    }
}