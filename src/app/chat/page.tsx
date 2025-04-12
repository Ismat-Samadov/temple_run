'use client';

import ChatInterface from '@/components/ChatInterface';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ChatPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect unauthenticated users to sign in
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin?redirectTo=/chat');
    }
  }, [user, loading, router]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 flex justify-center items-center">
        <div className="animate-pulse flex space-x-2">
          <div className="h-3 w-3 bg-indigo-400 rounded-full"></div>
          <div className="h-3 w-3 bg-indigo-400 rounded-full"></div>
          <div className="h-3 w-3 bg-indigo-400 rounded-full"></div>
        </div>
      </div>
    );
  }

  // Don't render anything if user is not authenticated (will redirect)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -inset-[10%] opacity-20">
          <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="b" gradientTransform="rotate(45 0.5 0.5)">
                <stop offset="0%" stopColor="#4338ca" />
                <stop offset="100%" stopColor="#5b21b6" />
              </linearGradient>
              <clipPath id="a">
                <path fill="currentColor" d="M744.5 750Q625 1000 375 750T124.5 250Q250 0 500 250T744.5 750Z" />
              </clipPath>
            </defs>
            <g clipPath="url(#a)">
              <path fill="url(#b)" d="M744.5 750Q625 1000 375 750T124.5 250Q250 0 500 250T744.5 750Z" />
            </g>
          </svg>
        </div>
      </div>
      
      <div className="container relative mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-indigo-100 mb-6">Chat with our Healthcare Assistant</h1>
          
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden h-[70vh] flex flex-col border border-gray-700">
            <ChatInterface />
          </div>
          
          <div className="mt-4 bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm text-indigo-200 font-medium">Healthcare Disclaimer:</p>
                <p className="text-sm text-indigo-300 mt-1">
                  This healthcare assistant is for informational purposes only. The information provided is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}