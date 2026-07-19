package com.vasavi.employee_service.exception;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

	   @ExceptionHandler(MethodArgumentNotValidException.class)
	    public ResponseEntity<Map<String, String>> handleValidationException(MethodArgumentNotValidException ex) {

	        Map<String, String> errors = new HashMap<>();

	        ex.getBindingResult().getFieldErrors().forEach(error -> {
	            errors.put(error.getField(), error.getDefaultMessage());
	        });

	        return ResponseEntity.badRequest().body(errors);
	    }

	    @ExceptionHandler(EmployeeNotFoundException.class)
	    public ResponseEntity<ApiError> handleEmployeeNotFoundException(
	            EmployeeNotFoundException ex,
	            HttpServletRequest request) {

	        ApiError error = new ApiError();

	        error.setTimestamp(LocalDateTime.now());
	        error.setStatus(HttpStatus.NOT_FOUND.value());
	        error.setMessage(ex.getMessage());
	        error.setPath(request.getRequestURI());

	        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
	    }}
