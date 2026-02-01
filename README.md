# Ygn Gym Backend API

A comprehensive gym management system built with NestJS, Prisma, and PostgreSQL.

## Features

- ✅ **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (ADMIN, TRAINER, USER)
  - Protected routes with guards
  
- ✅ **User Management**
  - Create, read, update, delete users
  - Password hashing with bcrypt
  - User roles and permissions

- ✅ **Membership Management**
  - Track membership status and types
  - Start and end dates
  - User associations

- ✅ **Class Management**
  - Create and manage gym classes
  - Assign trainers to classes
  - Schedule and capacity tracking

- ✅ **Booking System**
  - Book classes
  - Track user bookings
  - View booking history

- ✅ **API Documentation**
  - Interactive Swagger/OpenAPI documentation
  - Available at `/api` endpoint

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials and JWT secret

# Run database migrations
npx prisma migrate dev

# Seed the database (optional)
npx prisma db seed
```

### Running the Application

```bash
# Development mode
npm run dev

# Production mode
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000`
Swagger documentation at `http://localhost:3000/api`

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and receive JWT token
- `GET /auth/me` - Get current user profile (protected)

### Users

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create a new user
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Memberships

- `GET /memberships` - Get all memberships
- `GET /memberships/:id` - Get membership by ID
- `POST /memberships` - Create a new membership
- `PATCH /memberships/:id` - Update membership
- `DELETE /memberships/:id` - Delete membership

### Classes

- `GET /classes` - Get all classes
- `GET /classes/:id` - Get class by ID
- `POST /classes` - Create a new class
- `PATCH /classes/:id` - Update class
- `DELETE /classes/:id` - Delete class

### Bookings

- `GET /bookings` - Get all bookings
- `GET /bookings/:id` - Get booking by ID
- `POST /bookings` - Create a new booking
- `PATCH /bookings/:id` - Update booking
- `DELETE /bookings/:id` - Delete booking

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints:

1. Register or login to receive a JWT token
2. Include the token in the Authorization header:
   ```
   Authorization: Bearer <your-jwt-token>
   ```

### Example Login Request

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@gym.com",
    "password": "password123"
  }'
```

### Example Protected Request

```bash
curl -X GET http://localhost:3000/auth/me \
  -H "Authorization: Bearer <your-jwt-token>"
```

## Database Schema

The application uses the following models:

- **User** - User accounts with roles (ADMIN, TRAINER, USER)
- **Membership** - User memberships with types and status
- **Class** - Gym classes with trainers and schedules
- **Booking** - Class bookings by users

## Environment Variables

```env
DATABASE_URL="postgresql://user:password@localhost:5432/ygn-gym"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=3000
```

## Development Tools

```bash
# Run linter
npm run lint

# Format code
npm run format

# Run tests
npm run test

# Open Prisma Studio (database GUI)
npx prisma studio
```

## Seeded Data

The seed script creates:
- 1 admin user (admin@gym.com / password123)
- 10 trainers (trainer1@gym.com - trainer10@gym.com / password123)
- 100 users with memberships (user1@gym.com - user100@gym.com / password123)
- 5 gym classes assigned to trainers

## Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT with Passport
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI
- **Password Hashing**: bcrypt

## License

UNLICENSED
