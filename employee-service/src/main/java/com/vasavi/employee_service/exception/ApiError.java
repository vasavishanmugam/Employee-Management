package com.vasavi.employee_service.exception;

import java.time.LocalDateTime;
import java.time.LocalTime;

public class ApiError {

	private LocalDateTime timestamp;
	private int status;
	private String message;
	private String path;
	
	public ApiError() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ApiError(LocalDateTime timestamp, int status, String message, String path) {
		super();
		this.timestamp = timestamp;
		this.status = status;
		this.message = message;
		this.path = path;
	}
	public LocalDateTime getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(LocalDateTime localTime) {
		this.timestamp = localTime;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	
	
	
}
