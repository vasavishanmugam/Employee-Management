package com.vasavi.employee_service.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.vasavi.employee_service.entity.Employee;
import com.vasavi.employee_service.service.EmployeeService;

@RestController
@RequestMapping
public class EmployeeController {

	
	private final EmployeeService service;

	public EmployeeController(EmployeeService service) {
		super();
		this.service = service;
	}
	
	@GetMapping
	public List<Employee> getAllEmployees()
	{
		return service.getAllEmployees();
	}
	
	@PostMapping
	public Employee createEmployee(Employee employee)
	{
		return service.saveEmployee(employee);
	}
	
	@GetMapping("/{id}")
	public Employee getEmployeeById(@PathVariable Long id)
	{
		return service.getEmployeeById(id);
	}
	
}
