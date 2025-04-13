// src/app/init.ts
'use server';

import initializeDatabase from '@/lib/initDB';
import { testConnection } from '@/lib/db';

// This function will be called during app startup
export async function initializeApp() {
  try {
    console.log('Initializing application...');
    
    // Initialize database
    await initializeDatabase();
    
    // Test database connection
    await testConnection();
    
    console.log('Application initialized successfully');
    
    return { success: true };
  } catch (error) {
    console.error('Failed to initialize application:', error);
    return { success: false, error };
  }
}