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
   git clone https://github.com/arnite/evenTify.git
   cd evenTify
   ```

2. Install dependecies:

   ```bash
   npm install
   ```

3. Create .env file in the root directory and add the following environment variables

   ```env
   NODE_ENV=development (local) or production (deployment).
   DATABASE=your_default_database_url
   PORT=3000
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=your_expiry_time
   JWT_COOKIE_EXPIRES_IN=your_expiry_time
   EMAIL_USERNAME=mailtrap_username
   EMAIL_PASSWORD=mailtrap_password
   EMAIL_HOST=mailtrap_host
   EMAIL_PORT=mailtrap_port
   SUPER_ADMIN_NAME=super_admin_name
   SUPER_ADMIN_EMAIL=super_admin_email
   SUPER_ADMIN_PASSWORD=super_admin_password
   STRIPE_API_KEY=your_stripe_api_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

4. Run the server

```bash
npm start
```

The server should now be running on
http://localhost:3000

5. API Endpoints

## 5. API Endpoints

### **User Authentication & Management**

- **POST `/api/v1/users/signUp`**  
  _Register a new user._
- **POST `/api/v1/users/createAdmin`**  
  _Create an admin (only accessible by superAdmin)._
- **POST `/api/v1/users/login`**  
  _Log in a user and return a JWT token._
- **POST `/api/v1/users/forgotPassword`**  
  _Request a password reset._
- **POST `/api/v1/users/resetPassword/:token`**  
  _Reset the user's password using a reset token._
- **POST `/api/v1/users/updateMyPassword`**  
  _Update the user's password._
- **POST `/api/v1/users/updateMe`**  
  _Update the user's profile._
- **GET `/api/v1/users/me`**  
  _Get details of the currently authenticated user._
- **DELETE `/api/v1/users/deleteMe`**  
  _Delete the currently authenticated user._
- **GET `/api/v1/users`**  
  _Get a list of all users (only accessible by admin and superAdmin)._
- **GET `/api/v1/users/:id`**  
  _Get details of a specific user by ID._
- **PATCH `/api/v1/users/:id`**  
  _Update details of a specific user by ID._
- **DELETE `/api/v1/users/:id`**  
  _Delete a user by ID._

---

### **Event Management**

- **GET `/api/v1/events`**  
  _Get a list of all events._
- **POST `/api/v1/events`**  
  _Create a new event (requires admin or superAdmin access)._
- **GET `/api/v1/events/occurrences`**  
  _Get all events with their occurrences (only accessible by admin and superAdmin)._
- **GET `/api/v1/events/:id`**  
  _Get details of a specific event by ID._
- **PATCH `/api/v1/events/:id`**  
  _Update a specific event by ID (requires admin or superAdmin access)._
- **DELETE `/api/v1/events/:id`**  
  _Delete a specific event by ID (requires admin or superAdmin access)._

---

### **Booking Management**

- **GET `/api/v1/bookings/myBookings`**  
  _Get a list of all bookings made by the logged-in user._
- **GET `/api/v1/bookings`**  
  _Get a list of all bookings (accessible by admin & superAdmin)._
- **POST `/api/v1/bookings/:eventId`**  
  _Create a booking for an event (requires event details and user info)._
- **GET `/api/v1/bookings/:userId`**  
  _Get all bookings made by a specific user (requires admin access)._

---

### **Payment Management**

- **POST `/api/v1/payment/webhook`**  
  _Stripe webhook endpoint for handling incoming events (such as payment success or failure)._
- **GET `/api/v1/payment/checkoutSession/:bookingId`**  
  _Get a Stripe checkout session for a specific booking (requires authentication)._

---

6. Contributing

- **Fork the repository.**
- **Create a new branch (git checkout -b feature-name).**
- **Make changes and commit (git commit -am 'Brief description of your changes').**
- **Push to the branch (git push origin feature-name).**
- **Create a new Pull Request.**

7. API Documentation
   You can find the Postman collection for this API [here](https://documenter.getpostman.com/view/37611500/2sAYX3phqy).

8. License

- **This project is licensed under the MIT License - see the LICENSE file for details.**
