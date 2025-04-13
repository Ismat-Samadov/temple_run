// src/app/admin/doctors/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { User } from '@/types/user';
import { CheckCircle, XCircle } from 'lucide-react';

export default function AdminDoctorsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [doctors, setDoctors] = useState<User[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Check if user is admin
  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [user, loading, router]);

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      if (user?.role === 'admin') {
        try {
          setLoadingDoctors(true);
          const response = await axios.get('/api/admin/doctors');
          setDoctors(response.data.doctors || []);
        } catch (error) {
          console.error('Error fetching doctors:', error);
          setError('Failed to load doctor accounts');
        } finally {
          setLoadingDoctors(false);
        }
      }
    };

    fetchDoctors();
  }, [user]);

  const handleVerify = async (doctorId: string) => {
    try {
      setError(null);
      setSuccessMessage(null);
      
      const response = await axios.post('/api/admin/doctors/verify', { doctorId });
      
      if (response.data.success) {
        setSuccessMessage('Doctor account verified successfully');
        // Remove the verified doctor from the list
        setDoctors(doctors.filter(doctor => doctor.id !== doctorId));
      } else {
        setError(response.data.message || 'Failed to verify doctor account');
      }
    } catch (error) {
      console.error('Error verifying doctor:', error);
      setError('Failed to verify doctor account');
    }
  };

  const handleReject = async (doctorId: string) => {
    // In a real application, you would implement this to reject the doctor's application
    // For now, we'll just remove them from the list
    setDoctors(doctors.filter(doctor => doctor.id !== doctorId));
    setSuccessMessage('Doctor account rejected');
  };

  if (loading || loadingDoctors) {
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

  // Don't render for non-admins
  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-indigo-100">Doctor Verification</h1>
          <Link 
            href="/admin" 
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            Back to Dashboard
          </Link>
        </div>

        {error && (
          <div className="bg-red-900/50 border-l-4 border-red-500 text-red-100 p-4 mb-6">
            <p>{error}</p>
          </div>
        )}

        {successMessage && (
          <div className="bg-green-900/50 border-l-4 border-green-500 text-green-100 p-4 mb-6">
            <p>{successMessage}</p>
          </div>
        )}

        <div className="bg-gray-800/60 backdrop-blur-sm shadow overflow-hidden rounded-lg border border-gray-700">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-xl font-medium text-indigo-100">Doctor Accounts</h2>
            <p className="mt-1 max-w-2xl text-sm text-indigo-300">
              Verify and manage healthcare provider accounts
            </p>
          </div>
          <div className="border-t border-gray-700">
            {doctors.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-indigo-300">No pending doctor verifications.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700/50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">
                        Registered
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-indigo-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800/30 divide-y divide-gray-700">
                    {doctors.map((doctor) => (
                      <tr key={doctor.id} className="hover:bg-gray-700/30">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-indigo-100">{doctor.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-indigo-300">{doctor.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-300">
                          {new Date(doctor.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-3">
                            <button
                              onClick={() => handleVerify(doctor.id)}
                              className="text-green-500 hover:text-green-400 flex items-center"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Verify
                            </button>
                            <button
                              onClick={() => handleReject(doctor.id)}
                              className="text-red-500 hover:text-red-400 flex items-center"
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}