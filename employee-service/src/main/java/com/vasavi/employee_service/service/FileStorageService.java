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
	public String saveFile(MultipartFile file) throws IOException
	{
		String fileName = file.getOriginalFilename();
		Path uploadPath = Paths.get(FileUploadConfig.UPLOAD_DIR);
		if (!Files.exists(uploadPath))
		{
			Files.createDirectories(uploadPath);
		}
		
		Path filePath = uploadPath.resolve(fileName);
		file.transferTo(filePath);
		return fileName;
	}
}
