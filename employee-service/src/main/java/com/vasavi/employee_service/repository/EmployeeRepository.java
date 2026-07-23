package com.vasavi.employee_service.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.vasavi.employee_service.entity.Employee;
import com.vasavi.employee_service.projection.EmployeeNameEmailProjection;

import jakarta.transaction.Transactional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long>, JpaSpecificationExecutor<Employee> {
	List<Employee> findByNameContainingIgnoreCase(String name);
	
	List<Employee> findByEmailContainingIgnoreCase(String email);

	@Query("SELECT e FROM Employee e WHERE e.salary > :salary")
	List<Employee> findEmployeesWithSalaryGreaterThan(@Param("Salary") Double salary);

	@Query(
			value="SELECT * FROM Employees WHERE salary > :salary", nativeQuery=true)
	List<Employee> findEmployeesWithSalaryGreaterThanNative(@Param("salary") Double salary);

	@Modifying
	@Transactional
	@Query("UPDATE Employee e SET e.salary = :salary WHERE e.id = :id")
	int udpateEmployeeSalary(@Param("id") Long id, @Param("salary") Double salary);
	
	List<EmployeeNameEmailProjection> findBy(); 
}
