import { NextResponse } from 'next/server';
import { createUser } from '@/lib/user-db';
import { generateToken } from '@/lib/jwt';
import { SignUpData } from '@/types/user';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password }: SignUpData = body;
    
    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Please provide name, email, and password' },
        { status: 400 }
      );
    }
    
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }
    
    // Create user
    const user = await createUser({ name, email, password });
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Email already in use' },
        { status: 400 }
      );
    }
    
    // Generate JWT token
    const token = generateToken(user);
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      user,
      token
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to register user' },
      { status: 500 }
    );
  }
}