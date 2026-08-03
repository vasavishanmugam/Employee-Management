package com.vasavi.employee_service.dto;

import jakarta.validation.constraints.*;

public class EmployeeDto {
	
	private Long id;
	
	@NotBlank(message = "Name is required")
	private String name;
	
	@Email(message = "Invalid Email")
	@NotBlank(message = "Email is required")
	private String email;
	
	@NotNull(message = "Salary required")
	@Positive(message = "Salary must be greate than 0")
	private Double salary;
	
    private String profileImage;
    
	private String resumeFile;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getResumeFile() {
		return resumeFile;
	}

	public void setResumeFile(String resumeFile) {
		this.resumeFile = resumeFile;
	}

	public String getProfileImage() {
		return profileImage;
	}
	
	public void setProfileImage(String profileImage) {
		this.profileImage = profileImage;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public Double getSalary() {
		return salary;
	}
	
	public void setSalary(Double salary) {
		this.salary = salary;
	}
	
}
