// src/app/api/admin/create-admin/route.ts
import { NextResponse } from 'next/server';
import { createAdminUser } from '@/lib/user-db';
import { SignUpData } from '@/types/user';
import { generateToken } from '@/lib/jwt';

export async function POST(request: Request) {
  try {
    // This endpoint should be protected in a real-world scenario
    // For example, it could require a special admin creation key
    // or only be enabled during initial setup
    
    // Parse request body
    const body = await request.json();
    const { name, email, password, adminCreationKey }: SignUpData & { adminCreationKey: string } = body;
    
    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Please provide name, email, and password' },
        { status: 400 }
      );
    }
    
    // In a production environment, you should validate the admin creation key
    // against a secure environment variable
    // This is a simplified example
    const validAdminKey = process.env.ADMIN_CREATION_KEY || 'secure-admin-key';
    
    if (adminCreationKey !== validAdminKey) {
      return NextResponse.json(
        { success: false, message: 'Invalid admin creation key' },
        { status: 403 }
      );
    }
    
    // Create admin user
    const adminUser = await createAdminUser({
      name,
      email,
      password,
      role: 'admin'
    });
    
    if (!adminUser) {
      return NextResponse.json(
        { success: false, message: 'Failed to create admin user' },
        { status: 500 }
      );
    }
    
    // Generate JWT token
    const token = generateToken(adminUser);
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      user: adminUser,
      token
    });
  } catch (error) {
    console.error('Error creating admin user:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create admin user' },
      { status: 500 }
    );
  }
}