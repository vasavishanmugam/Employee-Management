package com.vasavi.employee_service.transaction;

import org.springframework.stereotype.Service;

import com.vasavi.employee_service.entity.Employee;
import com.vasavi.employee_service.repository.EmployeeRepository;

import jakarta.transaction.Transactional;

@Service
public class TransactionDemoService {

	private final EmployeeRepository repository;
	
	public TransactionDemoService(EmployeeRepository repository)
	{
		this.repository = repository;
	}
	@Transactional
	public void demoTransaction()
	{
		Employee employee = new Employee();
		employee.setName("Transaction alert");
		employee.setEmail("transaction@gmail.com");
		employee.setSalary(50000.0);
		repository.save(employee);
		System.out.print("Employee saved");
		int result = 10/0;
	}
}
