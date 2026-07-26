package com.vasavi.employee_service.service;

import com.vasavi.employee_service.entity.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vasavi.employee_service.dto.UserDto;
import com.vasavi.employee_service.repository.UserRepository;

@Service
public class UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	
	 public UserService(UserRepository userRepository,
             PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	 public User registerUser(UserDto dto)
	 {
		 if (userRepository.existsByEmail(dto.getEmail()))
		 {
			 throw new RuntimeException("Email already exists");
		 }
		 
		 User user = new User();
		 
		 user.setUsername(dto.getUsername());
		 user.setEmail(dto.getEmail());
		 
		 user.setPassword(passwordEncoder.encode(dto.getPassword()));
		 
		 return userRepository.save(user);
	 }
	
}
