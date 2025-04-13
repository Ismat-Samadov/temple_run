// src/app/api/admin/doctors/route.ts
import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import { isAdmin, getAllDoctors } from '@/lib/user-db';

export async function GET(request: Request) {
  try {
    // Authenticate and check if user is admin
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    
    if (!decoded?.id) {
      return NextResponse.json(
        { success: false, message: 'Invalid authentication token' },
        { status: 401 }
      );
    }
    
    // Check if user is an admin
    const adminCheck = await isAdmin(decoded.id);
    
    if (!adminCheck) {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      );
    }
    
    // Get all doctors
    const doctors = await getAllDoctors();
    
    return NextResponse.json({
      success: true,
      doctors
    });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch doctors' },
      { status: 500 }
    );
  }
}

