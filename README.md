# **Backend Node.js Developer Task Submission - Abdulquadri Omobolaji Jinad**

## **1. Project Overview**

This document provides an overview of the project I have developed to meet the requirements for the Backend Node.js Developer position. The goal was to create a web service that includes user authentication, wallet management, and donation tracking, with an emphasis on security, performance, and best practices.

## **2. Implementation Plan**

### **2.1 Project Setup**

- **Initialized the Node.js project** using npm.
- **Connected to MongoDB** with Mongoose for database operations.
- **Configured environment variables** using dotenv.
- **Installed essential packages**:
  - `express` for setting up the server.
  - `mongoose` for interacting with MongoDB.
  - `bcrypt` for hashing passwords.
  - `jsonwebtoken` for JWT-based authentication.
  - `nodemailer` for sending email notifications.
  - `artillery` for conducting load testing.
  - `express-rate-limit` for implementing rate limiting to enhance security.

### **2.2 Database Design**

- **User Schema**: Manages user credentials, wallet association, and transaction PIN.
- **Wallet Schema**: Handles wallet balance and links to the user.
- **Donation Schema**: Records details about donations, including donor, beneficiary, amount, and date.

### **2.3 Security Measures**

- **Input Validation**: Used `express-validator` for validating and sanitizing inputs.
- **Authentication**: Implemented JWT for secure user authentication.
- **Rate Limiting**: Added `express-rate-limit` to prevent brute-force attacks.
- **Database Security**: Used Mongoose to prevent MongoDB injection attacks.

### **2.4 API Endpoints**

- **Authentication**:
  - Register a new user: `POST /register`
  - Log in a user: `POST /login`
- **Wallet Management**:
  - Create a wallet: `POST /wallet`
- **Donation Management**:
  - Make a donation: `POST /donate`
  - View all donations: `GET /donations?page=1&limit=10`
  - View donations within a specific period: `GET /donations/period?startDate=yyyy-mm-dd&endDate=yyyy-mm-dd&page=1&limit=10`
  - View a specific donation: `GET /donation/:id`
- **Automatic Thank You Message**: Sent after two or more donations.

### **2.5 Pagination**

- Implemented pagination for donation endpoints using `page` and `limit` query parameters.

### **2.6 API Documentation**

- Documented the API using Swagger, providing examples for each request and response.

### **2.7 Load Testing**

- **Load tests** were written using `artillery`, targeting 100 requests per second for 30 seconds.
- Ensured p99 response time under 50ms.

### **2.8 Deployment**

- Deployed the service on Render.com with proper environment variable configurations.

## **3. GitHub Repository**

The complete source code for this project can be accessed on GitHub:  
[GitHub Repository Link](https://github.com/mobolajiJinad/fastamoni-backend-test)

## **4. Suggestions for Future Enhancements**

- **Unit Tests**: Consider implementing unit tests using Jest for all endpoints.
- **Advanced Error Handling**: Add more sophisticated error handling mechanisms for better security and user experience.

## **5. Conclusion**

This project demonstrates my ability to build a back-end Node.js application with a focus on security, scalability, and performance. I look forward to discussing this further in the final interview.
