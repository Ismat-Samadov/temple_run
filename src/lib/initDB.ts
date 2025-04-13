// src/lib/initDB.ts
import { query } from './db';

// Function to initialize the database when the server starts
export default async function initializeDatabase() {
  try {
    console.log('Initializing database...');
    
    // Create users table with role column
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'patient' NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Add role column if it doesn't exist (for existing deployments)
    await query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'patient' NOT NULL;
    `);
    
    // Create chat_history table
    await query(`
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
    `);
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    // In a production environment, you might want to handle this error differently
    // For now, we'll just log it and continue
  }
}