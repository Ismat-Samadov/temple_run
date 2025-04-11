import jwt from 'jsonwebtoken';
import { User } from '@/types/user';

// In a real application, store this in an environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'healthcare-app-secret-key';

export function generateToken(user: User): string {
  // Create a token that expires in 7 days
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}