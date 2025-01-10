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
   PORT = 3000
   DATABASE = mongodb://localhost:27017/yourdbname
   NODE_ENV = your environment (production / development)
   JWT_SECRET = your_jwt_secret
   JWT_EXPIRES_IN = your expiry day
   EMAIL_USERNAME = mailtrap username
   EMAIL_PASSWORD = mailtrap password
   EMAIL_HOST = mailtrap host
   EMAIL_PORT = mailtrap port
   SAname = superAdmin name
   SAemail = superAdmin email
   SApassword = superAdmin password
   SApasswordConfirm = superAdmin passwordConfirm
   SArole = superAdmin
   stripeApiKEY = your stripe ApiKey
   STRIPE_WEBHOOK_SECRET = your stripe webhook secret
   ```

4. Run the server

```bash
npm start
```

The server should now be running on
http://localhost:3000

5. API Endpoints

- **POST /api/v1/users/signUp**: Register a new user.
- **POST /api/v1/users/createAdmin**: Create an admin (only accessible by superAdmin.)
- **POST /api/v1/users/login**: Log in a user and return a JWT token.
- **POST /api/v1/users/forgotPassword**: Request password reset.
- **POST /api/v1/users/resetPassword/**:token: Reset the user's password using a reset token.
- **POST /api/v1/users/updateMyPassword**: Update the user's password.
- **POST /api/v1/users/updateMe**: Update the user's profile.
- **GET /api/v1/users/me**: Get details of the currently authenticated user.
- **DELETE /api/v1/users/deleteMe**: Delete the currently authenticated user.
- **GET /api/v1/users**: Get a list of all users (only accessible by admin and superadmin).
- **GET /api/v1/users/:id**: Get details of a specific user by ID.
- **PATCH /api/v1/users/:id**: Update details of a specific user by ID.
- **DELETE /api/v1/users/:id**: Delete a user by ID.
- **GET /api/v1/events**: Get a list of all events.
- **POST /api/v1/events**: Create a new event (requires admin or superadmin access).
- **GET /api/v1/events/occurrences**: Get all events with their occurrences (only accessible by admin and superadmin).
- **GET /api/v1/events/:id**: Get details of a specific event by ID.
- **PATCH /api/v1/events/:id**: Update a specific event by ID (requires admin or superadmin access).
- **DELETE /api/v1/events/:id**: Delete a specific event by ID (requires admin or superadmin access).
- **GET /api/v1/bookings/myBookings**: Get a list of all bookings made by the logged-in user.
- **GET /api/v1/bookings**: Get a list of all bookings (accessible by admins & super admins).
- **POST /api/v1/bookings/**:eventId: Create a booking for an event (requires event details and user info).
- **GET /api/v1/bookings/**:userId: Get all bookings made by a specific user (requires admin access).
- **POST /api/v1/payment/webhook**: Stripe webhook endpoint for handling incoming events (such as payment success or failure).
- **GET /api/v1/payment/checkoutSession/**:bookingId: Get a Stripe checkout session for a specific booking (requires authentication).

6. Contributing

- **Fork the repository.**
- **Create a new branch (git checkout -b feature-name).**
- **Make changes and commit (git commit -am 'Brief description of your changes').**
- **Push to the branch (git push origin feature-name).**
- **Create a new Pull Request.**

6. License

- **This project is licensed under the MIT License - see the LICENSE file for details.**
