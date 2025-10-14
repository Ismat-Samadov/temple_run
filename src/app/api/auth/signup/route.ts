// src/app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import { createUser } from '@/lib/user-db';
import { generateToken } from '@/lib/jwt';
import { SignUpData } from '@/types/user';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('=== SIGNUP DEBUG ===');
    console.log('Raw body received:', JSON.stringify(body));

    const { name, email, password, role }: SignUpData = body;

    console.log('After destructuring - role:', role, 'type:', typeof role);
    console.log('Sign-up request received for:', email, 'with role:', role);
    
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
    
    // Validate role
    const finalRole = (role === 'doctor' || role === 'patient') ? role : 'patient';

    console.log('Final role to be saved:', finalRole);

    if (finalRole === 'patient' && role !== 'patient') {
      console.log('WARNING: Role was changed from', role, 'to patient due to validation');
    }

    // Create user
    const user = await createUser({ name, email, password, role: finalRole });
    
    if (!user) {
      console.log('User creation failed: email may already be in use');
      return NextResponse.json(
        { success: false, message: 'Email already in use or user creation failed' },
        { status: 400 }
      );
    }
    
    // Generate JWT token
    const token = generateToken(user);
    console.log('User registered successfully as', user.role, ', token generated');
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: `User registered successfully as ${user.role}`,
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