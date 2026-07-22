package com.vasavi.employee_service.specification;
import org.springframework.data.jpa.domain.Specification;

import com.vasavi.employee_service.entity.Employee;

public class EmployeeSpecification {

public static Specification<Employee> hasName(String name)
{
	return (root, query, criteriaBuilder) -> criteriaBuilder.like(
			criteriaBuilder.lower(root.get("name")),
			"%" + name.toLowerCase() + "%");
}

public static Specification<Employee> hasEmail(String email)
{
	return (root, query, criteriaBuilder) -> 
	criteriaBuilder.like(
			criteriaBuilder.lower(root.get("email")),
			"%" + email.toLowerCase() + "%");
}

public static Specification<Employee> hasSalary(Double salary)
{
	return (root, query, criteriaBuilder) ->
	criteriaBuilder.equal(root.get("salary"), salary);
}
}
