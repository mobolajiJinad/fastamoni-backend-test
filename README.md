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
  - `express-rate-limit` for implementing rate limiting to enhance security.

### **2.2 Database Design**

- **User Schema**: Manages user credentials, wallet association, and transaction PIN.
- **Wallet Schema**: Handles wallet balance and links to the user.
- **Donation Schema**: Records details about donations, including donor, beneficiary, amount, and date.

### **2.3 Security Measures**

- **Authentication**: Implemented JWT for secure user authentication.
- **Rate Limiting**: Added `express-rate-limit` to prevent brute-force attacks.
- **Database Security**: Used Mongoose to prevent MongoDB injection attacks.

### **2.4 Pagination**

- Implemented pagination for donation endpoints using `page` and `limit` query parameters.

### **2.5 Deployment**

- Deployed the service on Render.com with proper environment variable configurations. [Live Link](https://fastamoni-backend-test-jinad-abdulquadri.onrender.com)

## **3. GitHub Repository**

The complete source code for this project can be accessed on GitHub:  
[GitHub Repository Link](https://github.com/mobolajiJinad/fastamoni-backend-test)

## **4. Conclusion**

This project demonstrates my ability to build a back-end Node.js application with a focus on security, scalability, and performance. I look forward to discussing this further in the final interview.
