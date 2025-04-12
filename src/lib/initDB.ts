import { initDatabase } from './db';

// Function to initialize the database when the server starts
export default async function initializeDatabase() {
  try {
    console.log('Initializing database...');
    await initDatabase();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    // In a production environment, you might want to handle this error differently
    // For now, we'll just log it and continue
  }
}