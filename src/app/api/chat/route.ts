import { NextResponse } from 'next/server';
import { processHealthcareQuery } from '@/lib/chatbot';
import { verifyToken } from '@/lib/jwt';
import { findUserById } from '@/lib/user-db';

export async function POST(request: Request) {
  try {
    const { message, userId } = await request.json();
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Check for authenticated user from Authorization header
    let authenticatedUser = null;
    const authHeader = request.headers.get('Authorization');
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7); // Remove 'Bearer ' prefix
      const decoded = verifyToken(token);
      
      if (decoded && decoded.id) {
        authenticatedUser = await findUserById(decoded.id);
      }
    }

    // If a userId was provided but doesn't match the authenticated user, ignore it
    const effectiveUserId = authenticatedUser?.id || null;
    
    // Process the healthcare query, potentially with user context
    const response = await processHealthcareQuery(message, effectiveUserId);
    
    return NextResponse.json({ message: response });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}