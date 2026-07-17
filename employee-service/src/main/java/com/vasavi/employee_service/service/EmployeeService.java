package com.vasavi.employee_service.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;


import com.vasavi.employee_service.entity.Employee;
import com.vasavi.employee_service.exception.EmployeeNotFoundException;
import com.vasavi.employee_service.repository.EmployeeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class EmployeeService {

	private final EmployeeRepository repository;
	
	private static final Logger logger = LoggerFactory.getLogger(EmployeeService.class);

	public EmployeeService(EmployeeRepository repository) {
		this.repository = repository;
	}

	public Employee saveEmployee(Employee employee)
	{
	    logger.info("Creating employee {}", employee.getName());

	    Employee savedEmployee = repository.save(employee);

	    logger.info("Employee created successfully with id {}", savedEmployee.getId());

	    return savedEmployee;
	}
	
	public List<Employee> getAllEmployees()
	{
	    logger.info("Fetching all employees");

	    List<Employee> employees = repository.findAll();

	    logger.info("Total employees found: {}", employees.size());

	    return employees;
	}
	
	public Employee getEmployeeById(Long id)
	{
	    logger.info("Fetching employee with id {}", id);

	    return repository.findById(id)
	            .orElseThrow(() -> {
	                logger.error("Employee not found with id {}", id);
	                return new EmployeeNotFoundException("Employee not found with id " + id);
	            });
	}
	
	public Employee updateEmployee(Long id, Employee employee)
	{
	    logger.info("Updating employee with id {}", id);

	    Employee existingEmployee = repository.findById(id)
	            .orElseThrow(() -> {
	                logger.error("Employee not found with id {}", id);
	                return new EmployeeNotFoundException("Employee not found with id " + id);
	            });

	    existingEmployee.setName(employee.getName());
	    existingEmployee.setEmail(employee.getEmail());
	    existingEmployee.setSalary(employee.getSalary());

	    Employee updatedEmployee = repository.save(existingEmployee);

	    logger.info("Employee updated successfully with id {}", id);

	    return updatedEmployee;
	}
	
	public String deleteEmployee(Long id)
	{
	    logger.info("Deleting employee with id {}", id);

	    if (!repository.existsById(id))
	    {
	        logger.error("Employee not found with id {}", id);
	        throw new EmployeeNotFoundException("Employee not found with id " + id);
	    }

	    repository.deleteById(id);

	    logger.info("Employee deleted successfully with id {}", id);

	    return "Employee deleted successfully";
	}
	
	public Page<Employee> getEmployees(Pageable pageable)
	{
	    logger.info(
	            "Fetching employees - Page: {}, Size: {}, Sort: {}",
	            pageable.getPageNumber(),
	            pageable.getPageSize(),
	            pageable.getSort());

	    Page<Employee> employeePage = repository.findAll(pageable);

	    logger.info(
	            "Fetched {} employees out of {} total",
	            employeePage.getNumberOfElements(),
	            employeePage.getTotalElements());

	    return employeePage;
	}
}
