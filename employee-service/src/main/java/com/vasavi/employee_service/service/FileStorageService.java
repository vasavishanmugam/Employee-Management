package com.vasavi.employee_service.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.vasavi.employee_service.config.FileUploadConfig;

@Service
public class FileStorageService {
	
	private String save(MultipartFile file, String folder) throws IOException {

		String fileName = file.getOriginalFilename();
		
		Path uploadPath = Paths.get(FileUploadConfig.UPLOAD_DIR, folder);
		
		if (!Files.exists(uploadPath))
		{
			Files.createDirectories(uploadPath);
		}
		
		Path filePath = uploadPath.resolve(fileName);
		
		file.transferTo(filePath);
		return fileName;
	}
		
	public String saveFile(MultipartFile file) 
	{
		try {
	        return save(file, "profile");
	    } catch (IOException e) {
	        throw new RuntimeException("Failed to save profile image", e);
	    }

	}
	
	public String saveResume(MultipartFile file) 
	{
		if (file  == null || file.isEmpty())
		{
			throw new IllegalArgumentException("Resume file is empty.");
		}
		
	    String originalFileName = file.getOriginalFilename();

		
		if (originalFileName == null || !originalFileName.toLowerCase().endsWith(".pdf"))
		{
			throw new IllegalArgumentException("Only PDF files are allowed");
		}
		
		try {
	        return save(file, "resume");
	    } catch (IOException e) {
	    	e.printStackTrace();
	        throw new RuntimeException("Failed to save resume", e);
	    }
	}
}
