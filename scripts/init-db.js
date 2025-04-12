// This script can be run to initialize the database schema
require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

// Create a database connection
const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: true
});

// Function to execute SQL queries
async function query(text, params) {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}

// Function to initialize the database
async function initDatabase() {
  try {
    console.log('Creating users table...');
    // Create users table
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    console.log('Creating chat_history table...');
    // Create chat_history table for storing user conversations
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
    
    console.log('Database initialized successfully!');
  } catch (err) {
    console.error('Error initializing database:', err);
    throw err;
  } finally {
    // End the pool
    await pool.end();
  }
}

// Run the initialization
initDatabase()
  .then(() => {
    console.log('Database setup complete.');
    process.exit(0);
  })
  .catch(error => {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  });