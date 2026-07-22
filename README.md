# Employee Management System API

A RESTful Employee Management System developed using Spring Boot and MySQL.

This project demonstrates real-world backend development concepts including CRUD operations, DTO mapping, validation, exception handling, pagination, sorting, JPQL, native SQL queries, dynamic search using JPA Specifications, and GitHub Actions CI.

---

# Tech Stack

- Java 21
- Spring Boot 3
- Spring Data JPA
- Hibernate
- MySQL
- Maven
- ModelMapper
- Jakarta Validation
- Swagger (OpenAPI)
- Git
- GitHub
- GitHub Actions

---

# Features

- Employee CRUD Operations
- DTO Pattern
- ModelMapper
- Bean Validation
- Global Exception Handling
- Logging using SLF4J
- Pagination
- Sorting
- JPQL Queries
- Native SQL Queries
- Dynamic Search using JPA Specifications
- Swagger API Documentation
- GitHub Actions Continuous Integration

---

# Project Structure

```
src
├── controller
├── dto
├── entity
├── exception
├── repository
├── service
├── specification
├── config
└── EmployeeServiceApplication
```

---

# API Endpoints

## Create Employee

```
POST /employees
```

## Get Employee by Id

```
GET /employees/{id}
```

## Update Employee

```
PUT /employees/{id}
```

## Delete Employee

```
DELETE /employees/{id}
```

## Get All Employees

```
GET /employees/all
```

---

# Pagination

```
GET /employees?page=0&size=5
```

Example

```
GET /employees?page=0&size=5&sort=name,asc
```

---

# Search APIs

### Search by Email

```
GET /employees/search/email?email=gmail
```

### Search by Salary

```
GET /employees/search/salary?salary=50000
```

---

# Dynamic Search (JPA Specification)

### Search by Name

```
GET /employees/filter?name=vas
```

### Search by Email

```
GET /employees/filter?email=gmail
```

### Search by Salary

```
GET /employees/filter?salary=50000
```

### Search by Name & Email

```
GET /employees/filter?name=vas&email=gmail
```

### Search by Name & Salary

```
GET /employees/filter?name=vas&salary=50000
```

### Search by Email & Salary

```
GET /employees/filter?email=gmail&salary=50000
```

### Search by Name, Email & Salary

```
GET /employees/filter?name=vas&email=gmail&salary=50000
```

---

# Validation

Implemented Bean Validation using Jakarta Validation.

Examples:

- Name cannot be blank.
- Email must be a valid email.
- Salary must be greater than zero.

---

# Exception Handling

Implemented centralized exception handling using:

- `@RestControllerAdvice`
- `@ExceptionHandler`

Handled Exceptions:

- EmployeeNotFoundException
- MethodArgumentNotValidException
- Validation Errors

---

# Logging

Implemented logging using SLF4J.

Logs include:

- Employee Created
- Employee Updated
- Employee Deleted
- Employee Retrieved
- Employee Search
- Exception Logs

---

# Swagger Documentation

Swagger UI

```
http://localhost:8080/swagger-ui/index.html
```

OpenAPI Documentation

```
http://localhost:8080/v3/api-docs
```

---

# Continuous Integration

GitHub Actions is configured to build the project automatically on every Push and Pull Request.

Current Workflow:

- Checkout Repository
- Setup Java 21
- Build using Maven

Build Command

```bash
mvn clean install -DskipTests
```

---

# How to Run

## Clone Repository

```bash
git clone https://github.com/<your-github-username>/employee-service.git
```

## Go to Project

```bash
cd employee-service
```

## Configure Database

Update your MySQL credentials in:

```
application.properties
```

Example

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/employee_db
spring.datasource.username=root
spring.datasource.password=your_password
```

## Run Application

```bash
mvn spring-boot:run
```

---

# Learning Outcomes

Through this project, I learned:

- REST API Development
- Layered Architecture
- DTO Pattern
- Bean Validation
- Global Exception Handling
- Logging with SLF4J
- Pagination
- Sorting
- JPQL
- Native SQL Queries
- Spring Data JPA Specifications
- Dynamic Query Building
- Git & GitHub
- GitHub Actions CI

---

# Upcoming Features

- Unit Testing (JUnit 5)
- Mockito
- Docker
- Docker Compose
- Jenkins
- SonarQube
- AWS Deployment
- Microservices
- Kafka

---

# Author

**Vasavi S**

GitHub:
https://github.com/vasavishanmugam
