// src/app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import { createUser } from '@/lib/user-db';
import { generateToken } from '@/lib/jwt';
import { SignUpData } from '@/types/user';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password }: SignUpData = body;
    
    console.log('Sign-up request received for:', email);
    
    // Validate input
    if (!name || !email || !password) {
      console.log('Sign-up validation failed: missing required fields');
      return NextResponse.json(
        { success: false, message: 'Please provide name, email, and password' },
        { status: 400 }
      );
    }
    
    if (password.length < 6) {
      console.log('Sign-up validation failed: password too short');
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }
    
    // Create user
    const user = await createUser({ name, email, password });
    
    if (!user) {
      console.log('User creation failed: email may already be in use');
      return NextResponse.json(
        { success: false, message: 'Email already in use or user creation failed' },
        { status: 400 }
      );
    }
    
    // Generate JWT token
    const token = generateToken(user);
    console.log('User registered successfully, token generated');
    
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
      { success: false, message: 'Failed to register user. Please try again later.' },
      { status: 500 }
    );
  }
}