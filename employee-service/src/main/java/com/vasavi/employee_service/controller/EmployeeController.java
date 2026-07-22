package com.vasavi.employee_service.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vasavi.employee_service.dto.EmployeeDto;
import com.vasavi.employee_service.entity.Employee;
import com.vasavi.employee_service.service.EmployeeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

	
	private final EmployeeService service;
	private final ModelMapper modelMapper;

	public EmployeeController(EmployeeService service, ModelMapper modelMapper) {
		this.service = service;
		this.modelMapper = modelMapper;
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<Employee>> getAllEmployees()
	{
	    return ResponseEntity.ok(service.getAllEmployees());
	}
	
	@PostMapping
	public ResponseEntity<EmployeeDto> createEmployee(@Valid @RequestBody EmployeeDto dto)
	{
		Employee employee = modelMapper.map(dto, Employee.class);
		
		Employee savedEmployee  = service.saveEmployee(employee);
		
		EmployeeDto responseDto =
		        modelMapper.map(savedEmployee, EmployeeDto.class);

		return ResponseEntity.ok(responseDto);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable Long id)
	{
		Employee employee = service.getEmployeeById(id);
		
		EmployeeDto dto = modelMapper.map(employee, EmployeeDto.class);
		
		return ResponseEntity.ok(dto);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable Long id, @Valid @RequestBody EmployeeDto dto)
	{
		Employee employee = modelMapper.map(dto, Employee.class);
		
		Employee updatedEmployee = service.updateEmployee(id, employee);
		
		EmployeeDto responseDto = modelMapper.map(updatedEmployee, EmployeeDto.class);

		return ResponseEntity.ok(responseDto);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteEmployee(@PathVariable Long id)
	{
		return ResponseEntity.ok(service.deleteEmployee(id));
	}
	
	@GetMapping
	public ResponseEntity<Page<Employee>> getEmployees(@ParameterObject Pageable pageable)
	{
		return ResponseEntity.ok(service.getEmployees(pageable));
	}
	
	@GetMapping("search/name")
	public ResponseEntity<List<Employee>> searchByName(@RequestParam String name)
	{
		return ResponseEntity.ok(service.searchByName(name));
	}
	
	@GetMapping("search/email")
	public ResponseEntity<List<Employee>> searchByEmail(@RequestParam String email)
	{
		return ResponseEntity.ok(service.searchByEmail(email));
	}
	
	@GetMapping("/salary")
	public ResponseEntity<List<Employee>> getEmployeesWithGreaterThan(@RequestParam Double salary)
	{
		return ResponseEntity.ok(service.getEmployeeSalaryGreaterThan(salary));
	}
	
	@GetMapping("/salary/native")
	public ResponseEntity<List<Employee>> getEmployeesWithGreaterThanNative(@RequestParam Double salary)
	{
		return ResponseEntity.ok(service.getEmployeesWithSalaryGreaterThanNative(salary));
	}
	
	@GetMapping("/{id}/salary")
	public ResponseEntity<String> updateSalary(@PathVariable Long id, @RequestParam Double salary)
	{
		return ResponseEntity.ok(service.udpateSalary(id, salary));
	}
	
	@GetMapping("/filter")
	public ResponseEntity<List<Employee>> searchEmployees(@RequestParam(required=false) String name,
			@RequestParam(required=false) String email,
			@RequestParam(required=false) Double salary)
	{
		return ResponseEntity.ok(service.searchEmployees(name, email, salary));
	}
}
