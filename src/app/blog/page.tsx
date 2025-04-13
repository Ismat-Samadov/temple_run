// src/app/blog/page.tsx
import React from 'react';
import BlogList from '@/components/blog/BlogList';

export const metadata = {
  title: 'Blog | Healthcare Assistant',
  description: 'Latest articles and health information from Healthcare Assistant',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-100 mb-4">
            Healthcare Blog
          </h1>
          <p className="text-xl text-indigo-300 max-w-3xl mx-auto">
            Latest articles, tips, and information on healthcare topics
          </p>
        </div>
        
        <BlogList />
      </div>
    </div>
  );
}