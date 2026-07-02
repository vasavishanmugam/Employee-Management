package com.vasavi.employee_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vasavi.employee_service.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
