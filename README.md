# Employee Management System - Backend

A production-oriented Employee Management REST API built using Spring Boot.

This project demonstrates real-world backend development concepts including CRUD operations, validation, exception handling, file upload, Swagger documentation, and JWT Authentication.

---

# Tech Stack

- Java 21
- Spring Boot 3.5.x
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- MySQL
- ModelMapper
- Swagger (OpenAPI)
- Maven

---

# Features

## Employee Management

- Create Employee
- Update Employee
- Delete Employee
- Get Employee By Id
- Get All Employees

---

## Validation

- Bean Validation
- Custom Validation Messages

---

## Exception Handling

- Global Exception Handler
- Custom Exception Responses

---

## Pagination & Sorting

- Pagination
- Sorting
- Pageable APIs

---

## Search

- Search by Name
- Search by Email
- Filter Employees

---

## Database

- JPQL Queries
- Native Queries
- Projection
- Transactions

---

## File Upload

### Profile Image

- Upload Profile Image
- Store Images
- Download Images

### Resume

- Upload PDF Resume
- Download Resume
- PDF Validation

---

## API Documentation

Swagger UI

```
http://localhost:8080/swagger-ui/index.html
```

---

## Authentication

Implemented using Spring Security + JWT.

### User Registration

```
POST /auth/register
```

### User Login

```
POST /auth/login
```

### Protected APIs

All Employee APIs require a valid JWT Bearer Token.

---

# Project Structure

```
src
 ├── config
 ├── controller
 ├── dto
 ├── entity
 ├── exception
 ├── payload
 ├── repository
 ├── security
 ├── service
 └── util
```

---

# Security Flow

```
Client
   │
   ▼
Login API
   │
AuthenticationManager
   │
AuthenticationProvider
   │
CustomUserDetailsService
   │
MySQL
   │
JWT Token
   │
Bearer Token
   │
JwtAuthenticationFilter
   │
Protected APIs
```

---

# API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /auth/register |
| POST | /auth/login |

---

## Employee

| Method | Endpoint |
|---------|----------|
| GET | /employees |
| GET | /employees/all |
| GET | /employees/{id} |
| POST | /employees |
| PUT | /employees/{id} |
| DELETE | /employees/{id} |

---

## Resume

| Method | Endpoint |
|---------|----------|
| POST | /employees/{id}/resume |
| GET | /employees/{id}/resume |

---

## Profile Image

| Method | Endpoint |
|---------|----------|
| POST | /employees/{id}/profile-image |

---

# Learning Outcomes

- Spring Boot
- REST APIs
- Spring Data JPA
- Hibernate
- DTO Pattern
- ModelMapper
- Validation
- Global Exception Handling
- Logging
- Pagination
- Sorting
- JPQL
- Native Query
- Projection
- Transactions
- Multipart File Upload
- Swagger
- Spring Security
- JWT Authentication

---

# Current Status

✅ Backend Phase 1 Completed

Completed Modules

- CRUD Operations
- Validation
- DTO
- Exception Handling
- Logging
- Pagination
- Sorting
- Search APIs
- Native Queries
- Projection
- Transactions
- Resume Upload
- Profile Image Upload
- Swagger Documentation
- Spring Security
- JWT Authentication

---

# Next Phase

Frontend Development

- React.js
- Vite
- Axios
- React Router
- JWT Integration
- Employee Dashboard
- Authentication UI

---

## Author

**Vasavi S**

Backend Developer | Java | Spring Boot | MySQL | Spring Security