'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, SignInData, SignUpData, AuthResponse } from '@/types/user';
import axios, { AxiosError } from 'axios';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (data: SignInData) => Promise<AuthResponse>;
  signUp: (data: SignUpData) => Promise<AuthResponse>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuthStatus = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('auth_token');
        
        if (token) {
          const response = await axios.get('/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          if (response.data.user) {
            setUser(response.data.user);
          }
        }
      } catch (err) {
        console.error('Auth check error:', err);
        localStorage.removeItem('auth_token');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const signIn = async (data: SignInData): Promise<AuthResponse> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post('/api/auth/signin', data);
      const result = response.data;
      
      if (result.success && result.token) {
        localStorage.setItem('auth_token', result.token);
        setUser(result.user);
      } else {
        setError(result.message || 'Sign in failed');
      }
      
      return result;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      const message = axiosError.response?.data?.message as string || 'Sign in failed';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (data: SignUpData): Promise<AuthResponse> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post('/api/auth/signup', data);
      const result = response.data;
      
      if (result.success && result.token) {
        localStorage.setItem('auth_token', result.token);
        setUser(result.user);
      } else {
        setError(result.message || 'Sign up failed');
      }
      
      return result;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      const message = axiosError.response?.data?.message as string || 'Sign up failed';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};