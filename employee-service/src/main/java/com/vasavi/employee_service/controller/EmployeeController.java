package com.vasavi.employee_service.controller;

import java.util.List;

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

	public EmployeeController(EmployeeService service) {
		this.service = service;
	}
	
	@GetMapping
	public List<Employee> getAllEmployees()
	{
		return service.getAllEmployees();
	}
	
	@PostMapping
	public ResponseEntity<Employee> createEmployee(@Valid @RequestBody EmployeeDto dto)
	{
		Employee employee = new Employee();
		
		employee.setName(dto.getName());
		employee.setEmail(dto.getEmail());
		employee.setSalary(dto.getSalary());
		return ResponseEntity.ok(service.saveEmployee(employee));
	}
	
	@GetMapping("/{id}")
	public Employee getEmployeeById(@PathVariable Long id)
	{
		return service.getEmployeeById(id);
	}
	
	@PutMapping("/{id}")
	public Employee updateEmployee(@PathVariable Long id, @RequestBody Employee employee)
	{
		return service.updateEmployee(id, employee);
	}
	
	@DeleteMapping("/{id}")
	public String deleteEmployee(@PathVariable Long id)
	{
		return service.deleteEmployee(id);
	}
	
}
