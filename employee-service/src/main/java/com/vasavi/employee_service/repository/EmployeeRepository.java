package com.vasavi.employee_service.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vasavi.employee_service.entity.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
	List<Employee> findByNameContainingIgnoreCase(String name);
	List<Employee> findByEmailContainingIgnoreCase(String email);
}
