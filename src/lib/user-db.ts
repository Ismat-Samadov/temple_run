import { User, SignUpData } from '@/types/user';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { query } from './db';

/**
 * Creates a new user in the PostgreSQL database
 */
export async function createUser(userData: SignUpData): Promise<User | null> {
  try {
    // Check if email already exists
    const emailCheckResult = await query(
      'SELECT * FROM users WHERE email = $1',
      [userData.email.toLowerCase()]
    );
    
    if (emailCheckResult.rows.length > 0) {
      return null; // Email already exists
    }
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    
    // Generate UUID for the new user
    const userId = uuidv4();
    const now = new Date();
    
    // Insert the new user
    const result = await query(
      `INSERT INTO users (id, name, email, password, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING id, name, email, created_at, updated_at`,
      [
        userId,
        userData.name,
        userData.email.toLowerCase(),
        hashedPassword,
        now,
        now
      ]
    );
    
    if (result.rows.length > 0) {
      // Convert the returned row to a User object
      return {
        id: result.rows[0].id,
        name: result.rows[0].name,
        email: result.rows[0].email,
        createdAt: new Date(result.rows[0].created_at),
        updatedAt: new Date(result.rows[0].updated_at)
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

/**
 * Finds a user by their email
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    const result = await query(
      'SELECT id, name, email, created_at, updated_at FROM users WHERE email = $1',
      [email.toLowerCase()]
    );
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return {
      id: result.rows[0].id,
      name: result.rows[0].name,
      email: result.rows[0].email,
      createdAt: new Date(result.rows[0].created_at),
      updatedAt: new Date(result.rows[0].updated_at)
    };
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
}

/**
 * Finds a user by their ID
 */
export async function findUserById(id: string): Promise<User | null> {
  try {
    const result = await query(
      'SELECT id, name, email, created_at, updated_at FROM users WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return {
      id: result.rows[0].id,
      name: result.rows[0].name,
      email: result.rows[0].email,
      createdAt: new Date(result.rows[0].created_at),
      updatedAt: new Date(result.rows[0].updated_at)
    };
  } catch (error) {
    console.error('Error finding user by ID:', error);
    throw error;
  }
}

/**
 * Validates a user's password
 */
export async function validatePassword(userId: string, password: string): Promise<boolean> {
  try {
    const result = await query(
      'SELECT password FROM users WHERE id = $1',
      [userId]
    );
    
    if (result.rows.length === 0) {
      return false;
    }
    
    const hashedPassword = result.rows[0].password;
    return bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error('Error validating password:', error);
    throw error;
  }
}

/**
 * Update user profile information
 */
export async function updateUserProfile(userId: string, name: string): Promise<User | null> {
  try {
    const now = new Date();
    const result = await query(
      `UPDATE users 
       SET name = $1, updated_at = $2 
       WHERE id = $3 
       RETURNING id, name, email, created_at, updated_at`,
      [name, now, userId]
    );
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return {
      id: result.rows[0].id,
      name: result.rows[0].name,
      email: result.rows[0].email,
      createdAt: new Date(result.rows[0].created_at),
      updatedAt: new Date(result.rows[0].updated_at)
    };
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

/**
 * Save a chat message to the database
 */
export async function saveChatMessage(userId: string, message: string, role: 'user' | 'system'): Promise<boolean> {
  try {
    const messageId = uuidv4();
    await query(
      `INSERT INTO chat_history (id, user_id, message, role) 
       VALUES ($1, $2, $3, $4)`,
      [messageId, userId, message, role]
    );
    
    return true;
  } catch (error) {
    console.error('Error saving chat message:', error);
    return false;
  }
}

/**
 * Get a user's chat history
 */
export async function getChatHistory(userId: string, limit: number = 20): Promise<any[]> {
  try {
    const result = await query(
      `SELECT id, message, role, timestamp 
       FROM chat_history 
       WHERE user_id = $1 
       ORDER BY timestamp DESC 
       LIMIT $2`,
      [userId, limit]
    );
    
    return result.rows.map(row => ({
      id: row.id,
      content: row.message,
      role: row.role,
      timestamp: new Date(row.timestamp)
    }));
  } catch (error) {
    console.error('Error retrieving chat history:', error);
    return [];
  }
}