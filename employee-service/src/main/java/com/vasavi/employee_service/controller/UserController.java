package com.vasavi.employee_service.controller;

import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vasavi.employee_service.dto.UserDto;
import com.vasavi.employee_service.entity.User;
import com.vasavi.employee_service.payload.ApiResponse;
import com.vasavi.employee_service.service.UserService;
import com.vasavi.employee_service.util.ResponseUtil;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class UserController {

	private final UserService userService;
	private final ModelMapper modelMapper;
	
	public UserController(UserService userService,
			ModelMapper modelMapper)
	{
		this.userService = userService;
		this.modelMapper = modelMapper;
	}
	
	@PostMapping("/register")
	public ResponseEntity<ApiResponse<UserDto>> registerUser(
			@Valid @RequestBody UserDto dto)
	{
		User savedUser = userService.registerUser(dto);
		
		UserDto responseDto = modelMapper.map(savedUser, UserDto.class);
		
		responseDto.setPassword(null);
		return ResponseUtil.success("User registered successfully", responseDto);
	}
	
}
