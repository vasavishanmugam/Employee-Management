package com.vasavi.employee_service.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.vasavi.employee_service.entity.Employee;
import com.vasavi.employee_service.repository.EmployeeRepository;

@Service
public class EmployeeService {

	private final EmployeeRepository repository;

	public EmployeeService(EmployeeRepository repository) {
		this.repository = repository;
	}

	public Employee saveEmployee(Employee employee)
	{
		return repository.save(employee);
	}
	
	public List<Employee> getAllEmployees()
	{
		return repository.findAll();
	}
	
	public Employee getEmployeeById(Long id)
	{
		return repository.findById(id).orElse(null);
	}
	
}
