# PostgreSQL Database Migration Guide

This document provides instructions for migrating from in-memory storage to PostgreSQL database for the Intelligent Healthcare Chatbot application.

## Prerequisites

Before you begin, ensure you have:

1. Access to a PostgreSQL database (this project uses Neon Tech's PostgreSQL service)
2. Node.js 18.x or higher installed
3. npm or yarn installed

## Installation

1. Install the required PostgreSQL dependencies:

```bash
npm install pg @types/pg --save
# or
yarn add pg @types/pg
```

2. Create a `.env.local` file in the root directory using the `.env.local.example` template:

```
# Copy the example env file
cp .env.local.example .env.local
```

3. Make sure the `.env.local` file has the correct database credentials:

```
# PostgreSQL Database Configuration
DB_HOST=your-database-host
DB_PORT=5432
DB_NAME=your-database-name
DB_USER=your-database-user
DB_PASSWORD=your-database-password
```

## Database Initialization

The database tables will be created automatically when the application starts. However, you can manually initialize the database with:

```bash
npm run db:init
# or
yarn db:init
```

This will create the necessary tables in your PostgreSQL database:

- `users` - Stores user account information
- `chat_history` - Stores user conversation history

## Implementation Details

The transition to PostgreSQL includes:

1. `src/lib/db.ts` - Database connection pool and query utility functions
2. `src/lib/user-db.ts` - Updated user operations to use PostgreSQL
3. `src/lib/chatbot.ts` - Enhanced to store chat history in the database
4. `src/middleware.ts` - Updated to initialize the database on server start

## Testing the Migration

After setting up the database, run the application:

```bash
npm run dev
# or
yarn dev
```

1. Create a new user account through the signup form
2. Verify the user data is stored in the PostgreSQL database
3. Test the chat functionality and confirm chat history is being saved

## Database Schema

### Users Table

```sql
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Chat History Table

```sql
CREATE TABLE IF NOT EXISTS chat_history (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  message TEXT NOT NULL,
  role VARCHAR(50) NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_user
    FOREIGN KEY(user_id) 
    REFERENCES users(id)
    ON DELETE CASCADE
);
```

## Troubleshooting

- **Connection Issues**: Ensure your database connection details are correct in the `.env.local` file
- **SSL Issues**: The connection is configured to use SSL. If you're using a local PostgreSQL server, you may need to modify the connection options in `src/lib/db.ts`
- **Migration Errors**: If you encounter errors during the transition, check the server logs for detailed error messages

If you need to reset the database tables, you can connect to your PostgreSQL database and drop the tables:

```sql
DROP TABLE IF EXISTS chat_history;
DROP TABLE IF EXISTS users;
```

Then restart the application or run the initialization script again.