// src/app/admin/blog/edit/[id]/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import BlogEditor from '@/components/admin/BlogEditor';

interface EditBlogPostPageProps {
  params: {
    id: string;
  };
}

export default function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const postId = params.id;

  // Check if user is admin
  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [user, loading, router]);

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

  // Don't render for non-admins
  if (!user || user.role !== 'admin') {
    return null;
  }

  return <BlogEditor postId={postId} />;
}