package com.vasavi.employee_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardStatsDto {

	private Long totalEmployees;
	
    private Double highestSalary;

	private Double lowestSalary;

	private Double averageSalary;  
}
