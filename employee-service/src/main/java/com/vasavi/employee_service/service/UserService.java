package com.vasavi.employee_service.service;

import com.vasavi.employee_service.entity.User;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vasavi.employee_service.dto.LoginRequest;
import com.vasavi.employee_service.dto.UserDto;
import com.vasavi.employee_service.repository.UserRepository;

@Service
public class UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;
	
	public UserService(UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager) {

		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtService = jwtService;
		this.authenticationManager = authenticationManager;
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
	
	 
	 public String loginUser(LoginRequest request) {

		    authenticationManager.authenticate(
		            new UsernamePasswordAuthenticationToken(
		                    request.getEmail(),
		                    request.getPassword()));

		    User user = userRepository.findByEmail(request.getEmail())
		            .orElseThrow(() ->
		                    new RuntimeException("User not found"));

		    return jwtService.generateToken(user.getEmail());
		}
}
