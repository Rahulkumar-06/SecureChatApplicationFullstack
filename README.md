# Secure Military Communication System

Author: Rahulkumar C  
Phone: 8870822514  
Email: rahulkumarc679@gmail.com


## Project Summary

The Secure Military Communication System is a full-stack real-time communication platform designed to provide secure message transmission for military operations.  
It uses encrypted JWT authentication, secure password hashing, and WebSocket STOMP-based real-time communication.

Backend: Spring Boot, WebSocket, STOMP, JWT  
Frontend: React JS  
Database: PostgreSQL

Backend folder: `secureApp`  
Frontend folder: `securefrontend`


## Backend Setup (Spring Boot — secureApp)

### 1. Navigate to the backend folder
```sh
   cd secureApp
````
### 2. Configure database and JWT
#### Open
    src/main/resources/application.properties

#### Set: 
    database username and password
    JWT secret
    port (optional)
### 3. Run the backend
```sh 
   mvn spring-boot:run
````
##### Or run directly using IntelliJ IDEA.
### Backend runs on:
      http://localhost:8080
### Frontend Setup (React — securefrontend)
#### 1. Navigate to frontend folder
```sh 
   cd securefrontend
````
#### 2. Install dependencies
```sh 
  npm install
````
#### 3. Start the frontend
```sh 
 npm run dev
````
#### Frontend runs on:
        http://localhost:5173

### System Workflow
#### Authentication Flow
User logs in using email and password

Passwords are stored using BCrypt hashing

JWT is generated during login

Token is used in every API and WebSocket request

Only valid JWT allows access to protected routes

#### Admin Flow
Admin logs in and is redirected to the admin dashboard

Admin can :
- manage users,
- view chat activity,
- register new soldiers,
- update or delete soldiers,
- manage weapons (create/update/delete)

#### Weapon Management
- Admin clicks "Go to Weapons"
- Admin can add new weapons
- Update weapon details
- Delete weapons
- View weapon list
#### Soldier Flow
- Soldier logs in
- Automatically redirected to the soldier list
- When one soldier is selected:
- WebSocket connects instantly,
- They can send and receive encrypted messages,
- Data is secure because:
- messages pass through STOMP,
- user identity is in JWT,
- no hacker can intercept.

#### Real-Time Chat
- One-to-one chat using

            /user/{username}/queue/messages
- Communication is instant using WebSocket
- No message delay
- Prevents data leak via secure token passing
### How to Run the Full Project
##### Step 1 — Start Backend
````sh 
  cd secureApp
  mvn spring-boot:run
````
##### Step 2 — Start Frontend
````sh 
  cd securefrontend
  npm run dev

````
##### Step 3 — Open Browser
        http://localhost:5173
##### Step 4 — Login as Admin or Soldier
Begin secure real-time communication.

### Contact
#### Name: Rahulkumar C
#### Phone: 8870822514
#### Email: rahulkumarc679@gmail.com


