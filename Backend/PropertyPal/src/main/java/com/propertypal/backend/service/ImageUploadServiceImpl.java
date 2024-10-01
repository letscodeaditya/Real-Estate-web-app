package com.propertypal.backend.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;	
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

@Service
public class ImageUploadServiceImpl implements ImageUploadService {

    @Autowired
    private AmazonS3 amazonS3;

    @Value("${aws.s3.bucket.name}")
    private String bucketName;

    @Override
    public String uploadImage(MultipartFile file) {
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        try {
            InputStream inputStream = file.getInputStream();
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(file.getSize());
            amazonS3.putObject(new PutObjectRequest(bucketName, fileName, inputStream, metadata));
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image", e);
        }
        return amazonS3.getUrl(bucketName, fileName).toString();
    }
}
