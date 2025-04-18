// src/app/blog/[slug]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import BlogPostDetail from '@/components/blog/BlogPostDetail';

export default function BlogPostPage() {
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const slug = params?.slug as string;

  useEffect(() => {
    // Simple effect to stop the initial loading state after component mounts
    // This gives the BlogPostDetail component time to handle its own loading state
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

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

  if (!slug) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 flex justify-center items-center">
        <div className="text-center text-indigo-200">
          <p>Invalid blog post URL</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900">
      <BlogPostDetail slug={slug} />
    </div>
  );
}