'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This helps avoid hydration mismatch
    setIsClient(true);
  }, []);

  const handleSignOut = () => {
    signOut();
    router.push('/auth/signin');
  };

  if (!isClient) {
    return null; // Prevent rendering until client-side
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-pulse flex space-x-2">
          <div className="h-3 w-3 bg-blue-600 rounded-full"></div>
          <div className="h-3 w-3 bg-blue-600 rounded-full"></div>
          <div className="h-3 w-3 bg-blue-600 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    // This should never happen due to middleware redirecting to sign in,
    // but it's good to have a fallback
    router.push('/auth/signin');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">User Profile</h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Personal details and account information
                </p>
              </div>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Sign Out
              </button>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Full name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.name}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Email address</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.email}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Account created</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {new Date(user.createdAt).toLocaleString()}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-xl font-medium text-gray-900">Healthcare Services</h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Your healthcare assistant features
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg hover:bg-gray-50 transition cursor-pointer" 
                     onClick={() => router.push('/')}>
                  <h3 className="text-lg font-medium text-blue-600">Chat with Assistant</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Get answers to your health questions from our AI assistant
                  </p>
                </div>
                <div className="p-4 border rounded-lg hover:bg-gray-50 transition cursor-pointer">
                  <h3 className="text-lg font-medium text-blue-600">Health Records</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    View and manage your health information (Coming soon)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}