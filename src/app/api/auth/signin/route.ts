import { NextResponse } from 'next/server';
import { findUserByEmail, validatePassword } from '@/lib/user-db';
import { generateToken } from '@/lib/jwt';
import { SignInData } from '@/types/user';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password }: SignInData = body;
    
    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Please provide email and password' },
        { status: 400 }
      );
    }
    
    // Find user
    const user = await findUserByEmail(email);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Validate password
    const isValid = await validatePassword(user.id, password);
    
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Generate JWT token
    const token = generateToken(user);
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Sign in successful',
      user,
      token
    });
  } catch (error) {
    console.error('Sign in error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to sign in' },
      { status: 500 }
    );
  }
}