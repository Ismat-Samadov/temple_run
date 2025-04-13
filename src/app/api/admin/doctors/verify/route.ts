// Fix for src/app/api/admin/doctors/verify/route.ts
// This route doesn't use dynamic parameters, but I'm updating it to use NextRequest
// for consistency

import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import { isAdmin, verifyDoctorAccount } from '@/lib/user-db';

export async function POST(request: NextRequest) {
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
    
    // Parse request body
    const body = await request.json();
    const { doctorId } = body;
    
    if (!doctorId) {
      return NextResponse.json(
        { success: false, message: 'Doctor ID is required' },
        { status: 400 }
      );
    }
    
    // Verify the doctor's account
    const success = await verifyDoctorAccount(doctorId, decoded.id);
    
    if (!success) {
      return NextResponse.json(
        { success: false, message: 'Failed to verify doctor account' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Doctor account verified successfully'
    });
  } catch (error) {
    console.error('Error verifying doctor account:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to verify doctor account' },
      { status: 500 }
    );
  }
}