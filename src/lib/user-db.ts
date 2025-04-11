import { User, SignUpData } from '@/types/user';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

// In-memory user database (replace with a real database in production)
const users: User[] = [];
const usersByEmail: Record<string, User> = {};
const passwordsByUserId: Record<string, string> = {};

export async function createUser(userData: SignUpData): Promise<User | null> {
  // Check if email already exists
  if (usersByEmail[userData.email.toLowerCase()]) {
    return null;
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  
  // Create the user
  const now = new Date();
  const user: User = {
    id: uuidv4(),
    email: userData.email.toLowerCase(),
    name: userData.name,
    createdAt: now,
    updatedAt: now
  };
  
  // Store user in our "database"
  users.push(user);
  usersByEmail[user.email] = user;
  passwordsByUserId[user.id] = hashedPassword;
  
  return user;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  return usersByEmail[email.toLowerCase()] || null;
}

export async function findUserById(id: string): Promise<User | null> {
  return users.find(user => user.id === id) || null;
}

export async function validatePassword(userId: string, password: string): Promise<boolean> {
  const hashedPassword = passwordsByUserId[userId];
  if (!hashedPassword) return false;
  
  return bcrypt.compare(password, hashedPassword);
}