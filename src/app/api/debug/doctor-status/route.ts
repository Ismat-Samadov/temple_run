// src/app/api/debug/doctor-status/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

/**
 * DEBUG ENDPOINT - Check doctor verification status in database
 * GET /api/debug/doctor-status?email=doctor@example.com
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email parameter required' },
        { status: 400 }
      );
    }

    // Get user
    const userResult = await query(
      'SELECT id, name, email, role, created_at FROM randevu.users WHERE email = $1',
      [email]
    );

    if (userResult.rows.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'User not found',
      });
    }

    const user = userResult.rows[0];

    // Get doctor profile if user is a doctor
    let profile = null;
    if (user.role === 'doctor') {
      const profileResult = await query(
        'SELECT * FROM randevu.doctor_profiles WHERE user_id = $1',
        [user.id]
      );

      if (profileResult.rows.length > 0) {
        profile = profileResult.rows[0];
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          created_at: user.created_at,
        },
        profile: profile ? {
          id: profile.id,
          user_id: profile.user_id,
          specialization: profile.specialization,
          city: profile.city,
          is_verified: profile.is_verified,
          created_at: profile.created_at,
          updated_at: profile.updated_at,
        } : null,
        diagnosis: {
          userExists: true,
          isDoctor: user.role === 'doctor',
          hasProfile: profile !== null,
          isVerified: profile ? profile.is_verified : false,
          shouldAppearInList: profile && profile.is_verified,
          shouldBeAccessible: profile && profile.is_verified,
        },
      },
    });
  } catch (error) {
    console.error('[Debug] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', error: String(error) },
      { status: 500 }
    );
  }
}
