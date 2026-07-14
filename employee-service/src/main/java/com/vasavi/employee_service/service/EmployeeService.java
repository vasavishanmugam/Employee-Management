package com.vasavi.employee_service.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

import org.springframework.data.domain.Page;
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
	
	public Employee updateEmployee(Long id, Employee employee)
	{
		Employee existingEmployee = repository.findById(id).orElse(null);
		if (existingEmployee == null)
		{
			return null;
		}
		
		existingEmployee.setName(employee.getName());
		existingEmployee.setEmail(employee.getEmail());
		existingEmployee.setSalary(employee.getSalary());
		
		return repository.save(existingEmployee);
	}
	
	public String deleteEmployee(Long id)
	{
		if(!repository.existsById(id))
		{
			return "Employee Not Found";
		}
		
		repository.deleteById(id);
		
		return "Employee deleted successfully";
		
	}
	
	public Page<Employee> getEmployees(Pageable pageable)
	{
		return repository.findAll(pageable);
	}
}
