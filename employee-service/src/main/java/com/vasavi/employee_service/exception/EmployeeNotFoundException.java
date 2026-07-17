package com.vasavi.employee_service.exception;

public final class EmployeeNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L;

	public EmployeeNotFoundException(String message)
	{
		super(message);
	}
}
