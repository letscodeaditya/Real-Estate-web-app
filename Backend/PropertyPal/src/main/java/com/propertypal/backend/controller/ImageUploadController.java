package com.propertypal.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.propertypal.backend.service.ImageUploadService;

@RestController
@RequestMapping("/api/v1/images")
public class ImageUploadController {

    @Autowired
    private ImageUploadService imageUploadService;

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            // Call service method to upload the image and get the URL
            String imageUrl = imageUploadService.uploadImage(file);
            
            // Create a response body
            Map<String, String> response = new HashMap<>();
            response.put("url", imageUrl); // Wrap the URL in a JSON object
            
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("error", "Error uploading image: " + e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
