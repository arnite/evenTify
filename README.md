# evenTify

## 1. Description

An Event Management System that allows users to book tickets for events, manage events, and support recurring events. The system is designed with a backend API that includes authentication, authorization, and event-related CRUD operations.

## 2. Features

- **User Authentication**: Users can sign up, log in, and manage their sessions securely using JWT tokens.
- **Event Management**: Admins can create, update, and delete events.
- **Ticket Booking**: Users can book tickets for available events.
- **Recurring Events**: The system supports recurring events (e.g., weekly, monthly).
- **CRUD Operations**: Fully functional event management with Create, Read, Update, and Delete operations.

## 3. Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (for now, with plans to integrate SQL in the future)
- **Authentication**: JWT (JSON Web Tokens)
- **Testing**: Postman for API testing
- **Version Control**: Git & GitHub
- **Deployment**: Heroku

## 4. Getting Started

### 4.1 Prerequisites

- [Node.js](https://nodejs.org/) - Ensure you have Node.js installed on your system.
- [MongoDB](https://www.mongodb.com/) - You need a MongoDB instance for your database.

### 4.2 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/project-name.git
   cd project-name
   ```

2. Install dependecies:

   ```bash
   npm install
   ```

3. Create .env file in the root directory and add the following environment variables

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/yourdbname
   JWT_SECRET=your_jwt_secret

   ```
