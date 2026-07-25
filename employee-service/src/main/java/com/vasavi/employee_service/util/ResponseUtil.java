package com.vasavi.employee_service.util;

import org.springframework.http.ResponseEntity;

import com.vasavi.employee_service.payload.ApiResponse;

public class ResponseUtil {
	public static <T>  ResponseEntity<ApiResponse<T>> success(String message, T data)
	{
		ApiResponse<T> response = new ApiResponse<T>(
				true,
				message,
				data);
		
		return ResponseEntity.ok(response);
	}
}
