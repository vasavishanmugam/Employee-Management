package com.vasavi.employee_service.controller;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vasavi.employee_service.dto.EmployeeDto;
import com.vasavi.employee_service.entity.Employee;
import com.vasavi.employee_service.payload.ApiResponse;
import com.vasavi.employee_service.projection.EmployeeNameEmailProjection;
import com.vasavi.employee_service.service.EmployeeService;
import com.vasavi.employee_service.service.FileStorageService;
import com.vasavi.employee_service.transaction.TransactionDemoService;
import com.vasavi.employee_service.util.ResponseUtil;

import org.springframework.http.MediaType;
import org.springframework.core.io.Resource;
import jakarta.validation.Valid;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/employees")
@Tag(name = "Employee Management", description = "Employee CRUD APIs")
public class EmployeeController {

	
	private final EmployeeService service;
	private final ModelMapper modelMapper;
	private final TransactionDemoService transactionDemoService;
	private final FileStorageService fileStorageService;
	
	public EmployeeController(EmployeeService service, 
			ModelMapper modelMapper,
			TransactionDemoService transactionDemoService,
			FileStorageService fileStorageService) {
		this.service = service;
		this.modelMapper = modelMapper;
		this.transactionDemoService = transactionDemoService;
		this.fileStorageService = fileStorageService;
	}
	
	@Operation(
		    summary = "Get All Employees",
		    description = "Returns all employees"
		)
	@GetMapping("/all")
	public ResponseEntity<ApiResponse<List<Employee>>> getAllEmployees()
	{
		List<Employee> employees = service.getAllEmployees();

	    return ResponseUtil.success(
	            "Employees fetched successfully",
	            employees);
	}
	
	@Operation(
			summary = "Create Employee",
			description = "Create a new employee in the system")
	@PostMapping
	public ResponseEntity<ApiResponse<EmployeeDto>> createEmployee(@Valid @RequestBody EmployeeDto dto)
	{
		Employee employee = modelMapper.map(dto, Employee.class);
		
		Employee savedEmployee  = service.saveEmployee(employee);
		
		EmployeeDto responseDto =
		        modelMapper.map(savedEmployee, EmployeeDto.class);

		return ResponseUtil.success(
	            "Employee created successfully",
	            responseDto);
	}
	
	@Operation(
		    summary = "Get Employee By Id",
		    description = "Returns employee details using employee id"
		)
	@GetMapping("/{id}")
	public ResponseEntity<ApiResponse<EmployeeDto>> getEmployeeById(@PathVariable Long id)
	{
		Employee employee = service.getEmployeeById(id);
		
		EmployeeDto dto = modelMapper.map(employee, EmployeeDto.class);
		
		
		return ResponseUtil.success(
		        "Employee fetched successfully",
		        dto);
	}
	
	@Operation(
			summary = "Update Employee",
			description = "Updates employee details")
	@PutMapping("/{id}")
	public ResponseEntity<ApiResponse<EmployeeDto>> updateEmployee(@PathVariable Long id, @Valid @RequestBody EmployeeDto dto)
	{
		Employee employee = modelMapper.map(dto, Employee.class);
		
		Employee updatedEmployee = service.updateEmployee(id, employee);
		
		EmployeeDto responseDto = modelMapper.map(updatedEmployee, EmployeeDto.class);

		return ResponseUtil.success(
	            "Employee updated successfully",
	            responseDto);
	}
	
	@Operation(
		    summary = "Delete Employee",
		    description = "Deletes employee by id"
		)
	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse<String>> deleteEmployee(@PathVariable Long id)
	{
		String message = service.deleteEmployee(id);

	    return ResponseUtil.success(
	            message,
	            null);
	}
	
	@Operation(
		    summary = "Get Employees",
		    description = "Returns paginated employee list"
		)
	@GetMapping
	public ResponseEntity<ApiResponse<Page<Employee>>> getEmployees(@ParameterObject Pageable pageable)
	{
		Page<Employee> employeePage = service.getEmployees(pageable);

	    return ResponseUtil.success(
	            "Employees fetched successfully",
	            employeePage);
	}
	
	@Operation(
		    summary = "Search Employee By Name",
		    description = "Returns employees matching the given name"
		)
	@GetMapping("search/name")
	public ResponseEntity<ApiResponse<List<Employee>>> searchByName(@RequestParam String name)
	{
		List<Employee> employees = service.searchByName(name);

	    return ResponseUtil.success(
	            "Employees fetched successfully",
	            employees);
	}
	
	@Operation(
		    summary = "Search Employee By Email",
		    description = "Returns employees matching the given email"
		)
	@GetMapping("search/email")
	public ResponseEntity<ApiResponse<List<Employee>>> searchByEmail(@RequestParam String email)
	{
		List<Employee> employees = service.searchByEmail(email);

	    return ResponseUtil.success(
	            "Employees fetched successfully",
	            employees);
	}
	
	@Operation(
		    summary = "Employees By Salary",
		    description = "Returns employees whose salary is greater than the given value"
		)
	@GetMapping("/salary")
	public ResponseEntity<ApiResponse<List<Employee>>> getEmployeesWithGreaterThan(
	        @RequestParam Double salary) {

	    List<Employee> employees = service.getEmployeeSalaryGreaterThan(salary);

	    return ResponseUtil.success(
	            "Employees fetched successfully",
	            employees);
	}
	
	@Operation(
		    summary = "Employees By Salary (Native Query)",
		    description = "Returns employees using a native SQL query"
		)
	@GetMapping("/salary/native")
	public ResponseEntity<ApiResponse<List<Employee>>> getEmployeesWithGreaterThanNative(@RequestParam Double salary)
	{
		List<Employee> employees = service.getEmployeesWithSalaryGreaterThanNative(salary);

	    return ResponseUtil.success(
	            "Employees fetched successfully",
	            employees);
	}
	
	@Operation(
		    summary = "Update Employee Salary",
		    description = "Updates salary of an employee"
		)
	@PutMapping("/{id}/salary")
	public ResponseEntity<ApiResponse<String>> updateSalary(@PathVariable Long id, @RequestParam Double salary)
	{
		String message = service.udpateSalary(id, salary);

	    return ResponseUtil.success(
	            message,
	            null);
	}
	
	@Operation(
		    summary = "Filter Employees",
		    description = "Search employees using dynamic filters"
		)
	@GetMapping("/filter")
	public ResponseEntity<ApiResponse<Page<Employee>>> searchEmployees(@RequestParam(required=false) String name,
			@RequestParam(required=false) String email,
			@RequestParam(required=false) Double salary,
			Pageable pageable)
	{
		Page<Employee> employeePage =
	            service.searchEmployees(name, email, salary, pageable);

	    return ResponseUtil.success(
	            "Employees fetched successfully",
	            employeePage);
	}
	
	@Operation(
		    summary = "Employee Projection",
		    description = "Returns only employee name and email"
		)
	@GetMapping("/projection")
	public ResponseEntity<ApiResponse<List<EmployeeNameEmailProjection>>> getEmployeeNameAndEmail()
	{
		List<EmployeeNameEmailProjection> employees =
	            service.getEmployeeNameAndEmail();

	    return ResponseUtil.success(
	            "Employees fetched successfully",
	            employees);
	}
	
	@Operation(
		    summary = "Transaction Demo",
		    description = "Demonstrates Spring transaction management"
		)
	@GetMapping("/transaction")
	public ResponseEntity<ApiResponse<String>> testTransaction() {

	    transactionDemoService.demoTransaction();

	    return ResponseUtil.success(
	            "Transaction completed successfully",
	            null);
	}
	
	@Operation(
		    summary = "Upload Profile Image",
		    description = "Uploads employee profile image"
		)
	@PostMapping("/{id}/profile-image")
	public ResponseEntity<ApiResponse<EmployeeDto>> uploadProfileImage(@PathVariable Long id,
			@RequestParam("file") MultipartFile file)
					throws IOException
	{
		String fileName = fileStorageService.saveFile(file);
		service.updateProfileImage(id, fileName);
		Employee employee = service.getEmployeeById(id);
		EmployeeDto dto = modelMapper.map(employee, EmployeeDto.class);
		return ResponseUtil.success(
	            "Profile image uploaded successfully",
	            dto);	}
	
	@Operation(
		    summary = "Upload Resume",
		    description = "Uploads employee resume"
		)
	@PostMapping("/{id}/resume")
	public ResponseEntity<ApiResponse<EmployeeDto>> uploadResume(@PathVariable Long id,
			@RequestParam("file") MultipartFile file)
	throws IOException
	{
		String fileName = fileStorageService.saveResume(file);
		service.updateResumeFile(id, fileName);
		
		Employee employee = service.getEmployeeById(id);
		EmployeeDto dto = modelMapper.map(employee, EmployeeDto.class);
		return ResponseUtil.success(
	            "Resume uploaded successfully",
	            dto);
	}
	
	@Operation(
		    summary = "Download Resume",
		    description = "Downloads employee resume"
		)
	@GetMapping("/{id}/resume")
	public ResponseEntity<Resource> downloadResume(@PathVariable Long id) throws IOException
	{
		Employee employee = service.getEmployeeById(id);
		
		if (employee.getResumeFile() == null)
		{
			throw new RuntimeException("Resume not uploaded.");
		}
		
		Path filePath = Paths.get("uploads/resumes/").resolve(employee.getResumeFile());
		
		UrlResource resource = new UrlResource(filePath.toUri());
	
		if (!resource.exists())
		{
		throw new RuntimeException("Resume file not found");
		}
		return ResponseEntity.ok()
				.contentType(MediaType.APPLICATION_PDF)
				.header(HttpHeaders.CONTENT_DISPOSITION,
						"attachment; filename=\"" + employee.getResumeFile() + "\"")
				.body(resource);
	}
}
