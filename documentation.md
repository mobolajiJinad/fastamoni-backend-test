## 1. **Project Setup**

- Initialize the Node.js project.
- Set up a connection to MongoDB using Mongoose.
- Set up environment variables for configuration using dotenv.
- Install essential packages:
  - `express` for server setup.
  - `mongoose` for MongoDB interaction.
  - `bcrypt` for password hashing.
  - `jsonwebtoken` for JWT-based authentication.
  - `nodemailer` for email notifications.
  - `artillery` for load testing.
  - `express-rate-limit` for rate limiting as an additional security measure.

## 2. **Database Design**

- **User**: Store user credentials, wallet info, and transaction PIN.
- **Wallet**: Store wallet balance and associated user.
- **Donation**: Store information on donations, including donor, beneficiary, amount, and date.

## 3. **API Implementation**

- **Authentication**:
  - Register user: POST `/api/v1/auth/signup`
  - Login user: POST `/api/v1/auth/login`
- **Wallet**:
  - Create a wallet: POST `/api/v1/wallet`
- **Donation**:
  - Make a donation: POST `/api/v1/donate`
  - View donations: GET `/api/v1/donations?page=1&limit=10`
  - View donations in a period: GET `/api/v1/donations/period?startDate=yyyy-mm-dd&endDate=yyyy-mm-dd&page=1&limit=10`
  - View a single donation: GET `/api/v1/donation/:donationID`
- **Thank you message**: Automatically send after two or more donations.

## 5. **Documentation (Example)**

### **API Endpoints**

1. ### **Signup**

**POST** `/api/v1/auth/signup`

- **Description**: Create a new user account.
- **Request Body**:
  ```json
  {
    "username": "userUsername",
    "email": "user@example.com",
    "password": "password#123"
  }
  ```
- **Response**:
  ```json
  {
    "user": {
      "username": "userUsername",
      "email": "user@example.com",
      "password": "$2a$12$0NBRUSOtJivjZUbdjIYWP.NxzaH5kyALWx8lIIIDLKqoDbgqqPkV.",
      "_id": "66cbb5ef558b6957aeb302e7",
      "__v": 0
    }
  }
  ```

2. ### **Login**

   - **POST** `/api/v1/auth/login`
   - **Description**: Log in with credentials.
   - **Request Body**:
     ```json
     {
       "usernameOrEmail": "userUsername",
       "password": "password#123"
     }
     ```
   - **Response**:
     ```json
     {
       "user": {
         "_id": "66cbb5ef558b6957aeb302e7",
         "username": "userUsername",
         "email": "user@example.com",
         "password": "$2a$12$0NBRUSOtJivjZUbdjIYWP.NxzaH5kyALWx8lIIIDLKqoDbgqqPkV.",
         "__v": 0
       },
       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NmNiYjVlZjU1OGI2OTU3YWViMzAyZTciLCJ1c2VybmFtZSI6InVzZXJVc2VybmFtZSIsImlhdCI6MTcyNDYyNjQ4M30.r61B1cn1Z0fTaUL4Pkgq0sPguTCkBD-PI7CnaKo4Jiw"
     }
     ```

3. ### **Create Wallet**

   - **POST** `/api/v1/wallet`
   - **Description**: Create a wallet and transaction PIN.
   - **Request Body**:
     ```json
     { "walletPin": "12345" }
     ```
   - **Request Header**:
     ```json
     {
       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NmNiYjVlZjU1OGI2OTU3YWViMzAyZTciLCJ1c2VybmFtZSI6InVzZXJVc2VybmFtZSIsImlhdCI6MTcyNDYyNjQ4M30.r61B1cn1Z0fTaUL4Pkgq0sPguTCkBD-PI7CnaKo4Jiw"
     }
     ```
   - **Response**:
     ```json
     {
       "message": "Wallet created successfully",
       "wallet": {
         "user": "66cbb5ef558b6957aeb302e7",
         "balance": 10000,
         "walletPin": "$2a$12$EtrUdcK0914oULcOx8o9Yev5crwprsfZnEqVZ/bQLur1l.3aN09cW",
         "_id": "66cbb6f6558b6957aeb302eb",
         "__v": 0
       }
     }
     ```

4. ### **Make a Donation**

   - **POST** `/api/v1/donate`
   - **Description**: Donate to a fellow user.
   - **Request Body**:
     ```json
     {
       "beneficiaryUsername": "Omobolaji",
       "amount": "2000",
       "walletPin": "12345"
     }
     ```
   - **Request Header**:
     ```json
     {
       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NmNiYjVlZjU1OGI2OTU3YWViMzAyZTciLCJ1c2VybmFtZSI6InVzZXJVc2VybmFtZSIsImlhdCI6MTcyNDYyNjQ4M30.r61B1cn1Z0fTaUL4Pkgq0sPguTCkBD-PI7CnaKo4Jiw"
     }
     ```
   - **Response**:
     ```json
     {
       "message": "Donation successful",
       "donorWallet": {
         "_id": "66cbb6f6558b6957aeb302eb",
         "user": "66cbb5ef558b6957aeb302e7",
         "balance": 8000,
         "walletPin": "$2a$12$/pUskoxUNbkMNVRsPn.uxOmhaLfeh4aK6mlPEQehI5Qb6YEETqh6.",
         "__v": 0
       }
     }
     ```

5. **View Donations (Paginated)**

   - **GET** `/api/v1/donations?page=1&limit=10`
   - **Description**: View donations made by the user.
   - **Request Header**:
     ```json
     {
       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NmNiYjVlZjU1OGI2OTU3YWViMzAyZTciLCJ1c2VybmFtZSI6InVzZXJVc2VybmFtZSIsImlhdCI6MTcyNDYyNjQ4M30.r61B1cn1Z0fTaUL4Pkgq0sPguTCkBD-PI7CnaKo4Jiw"
     }
     ```
   - **Response**:
     ```json
      [
        {
            "_id": "66cbb865558b6957aeb302f1",
            "donor": "66cbb5ef558b6957aeb302e7",
            "beneficiary": "66cb362f5ec6f26a6498692b",
            "amount": 2000,
            "date": "2024-08-25T23:04:05.471Z",
            "__v": 0
        },
        ...
     ]
     ```

6. **View Donations within a Period (Paginated)**

   - **GET** `/api/v1/donations/period?startDate=2024-08-25&endDate=2024-08-26&page=1&limit=10`
   - **Description**: View donations made within a specified period.
   - **Request Header**:
     ```json
     {
       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NmNiYjVlZjU1OGI2OTU3YWViMzAyZTciLCJ1c2VybmFtZSI6InVzZXJVc2VybmFtZSIsImlhdCI6MTcyNDYyNjQ4M30.r61B1cn1Z0fTaUL4Pkgq0sPguTCkBD-PI7CnaKo4Jiw"
     }
     ```
   - **Response**:
     ```json
     [
       {
        "_id": "66cbb865558b6957aeb302f1",
        "donor": "66cbb5ef558b6957aeb302e7",
        "beneficiary": "66cb362f5ec6f26a6498692b",
        "amount": 2000,
        "date": "2024-08-25T23:04:05.471Z",
        "__v": 0
       },
       ...
     ]
     ```

7. **View a Single Donation**
   - **GET** `/api/v1/donation/:donationID`
   - **Description**: View details of a specific donation.
   - **Request Header**:
     ```json
     {
       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NmNiYjVlZjU1OGI2OTU3YWViMzAyZTciLCJ1c2VybmFtZSI6InVzZXJVc2VybmFtZSIsImlhdCI6MTcyNDYyNjQ4M30.r61B1cn1Z0fTaUL4Pkgq0sPguTCkBD-PI7CnaKo4Jiw"
     }
     ```
   - **Response**:
     ```json
     {
       "_id": "66cbb865558b6957aeb302f1",
       "donor": "66cbb5ef558b6957aeb302e7",
       "beneficiary": "66cb362f5ec6f26a6498692b",
       "amount": 2000,
       "date": "2024-08-25T23:04:05.471Z",
       "__v": 0
     }
     ```
