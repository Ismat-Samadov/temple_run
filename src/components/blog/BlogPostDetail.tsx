// src/components/blog/BlogPostDetail.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { BlogPost } from '@/types/user';
import { formatBlogContent, getReadingTime, generateTableOfContents, TocItem } from '@/utils/blogFormatter';
import { Clock, Calendar, Tag, User, Edit, Trash2, Share2 } from 'lucide-react';

interface BlogPostDetailProps {
  slug: string;
}

export default function BlogPostDetail({ slug }: BlogPostDetailProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [formattedContent, setFormattedContent] = useState<string>('');
  const [showToc, setShowToc] = useState(false);
  const [tableOfContents, setTableOfContents] = useState<TocItem[]>([]);
  const { user } = useAuth();
  const router = useRouter();
  const isUserAdmin = user?.role === 'admin';

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        // In a real application, you would have an API endpoint to fetch by slug
        // For now, we'll fetch all posts and find the one with the matching slug
        const response = await axios.get('/api/blog');
        const allPosts = response.data.posts || [];
        const foundPost = allPosts.find((p: BlogPost) => p.slug === slug);
        
        if (foundPost) {
          setPost(foundPost);
          
          // Format the content with our utility
          const enhanced = formatBlogContent(foundPost.content);
          setFormattedContent(enhanced);
          
          // Generate table of contents
          const toc = generateTableOfContents(enhanced);
          setTableOfContents(toc);
          
          // Reset image error state when loading a new post
          setImageError(false);
        } else {
          setError('Blog post not found');
        }
      } catch (err) {
        setError('Failed to load blog post. Please try again later.');
        console.error('Error fetching blog post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const handleDelete = async () => {
    if (!post || !window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await axios.delete(`/api/blog/${post.id}`);
      router.push('/blog');
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete post. Please try again.');
    }
  };

  // Function to handle sharing
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title || 'Blog Post',
          text: post?.summary || 'Check out this blog post',
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      alert('URL copied to clipboard!');
    }
  };

  // Function to handle image load errors
  const handleImageError = () => {
    setImageError(true);
  };

  // Toggle table of contents
  const toggleToc = () => {
    setShowToc(!showToc);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-700 rounded w-3/4 mb-8"></div>
          <div className="h-6 bg-gray-700 rounded w-1/2 mb-10"></div>
          <div className="h-96 bg-gray-700 rounded mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-900/50 border-l-4 border-red-500 text-red-100 p-4 rounded-lg">
          <p>{error || 'Blog post not found'}</p>
        </div>
        <Link 
          href="/blog" 
          className="mt-6 inline-block text-indigo-400 hover:text-indigo-300"
        >
          ← Back to blog
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      <Link 
        href="/blog" 
        className="text-indigo-400 hover:text-indigo-300 inline-flex items-center mb-6"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back to blog
      </Link>
      
      <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden shadow-lg">
        {/* Featured image with standardized height */}
        {post.imageUrl && !imageError ? (
          <div className="w-full h-72 md:h-96 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          </div>
        ) : (
          <div className="w-full h-72 md:h-80 bg-gray-700/50 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        <div className="p-8">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-indigo-100 mb-4">{post.title}</h1>
            
            <div className="flex flex-wrap items-center text-sm text-indigo-300 mb-6 gap-4">
              <div className="flex items-center">
                <User size={16} className="mr-1" />
                <span>{post.authorName}</span>
              </div>

              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>{getReadingTime(post.content)} min read</span>
              </div>
              
              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center flex-wrap gap-2">
                  <Tag size={16} className="mr-1" />
                  {post.tags.map((tag, index) => (
                    <span key={index} className="bg-indigo-900/60 px-2 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              {tableOfContents.length > 0 && (
                <button 
                  onClick={toggleToc}
                  className="text-indigo-400 text-sm hover:text-indigo-300 flex items-center"
                >
                  {showToc ? 'Hide Table of Contents' : 'Show Table of Contents'}
                </button>
              )}
              
              <div className="flex space-x-3">
                {isUserAdmin && (
                  <>
                    <Link 
                      href={`/admin/blog/edit/${post.id}`}
                      className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700 flex items-center"
                    >
                      <Edit size={16} className="mr-1" />
                      Edit
                    </Link>
                    <button 
                      onClick={handleDelete}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 flex items-center"
                    >
                      <Trash2 size={16} className="mr-1" />
                      Delete
                    </button>
                  </>
                )}
                <button 
                  onClick={handleShare}
                  className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 flex items-center"
                >
                  <Share2 size={16} className="mr-1" />
                  Share
                </button>
              </div>
            </div>
            
            {/* Table of Contents */}
            {showToc && tableOfContents.length > 0 && (
              <div className="mt-6 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                <h3 className="text-lg font-medium text-indigo-200 mb-2">Table of Contents</h3>
                <ul className="space-y-1">
                  {tableOfContents.map((item, index) => (
                    <li 
                      key={index} 
                      className="text-indigo-300 hover:text-indigo-100"
                      style={{ paddingLeft: `${(item.level - 2) * 1}rem` }}
                    >
                      <a href={`#${item.id}`} className="hover:underline">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </header>
          
          {/* Display formatted content */}
          <div className="prose prose-invert max-w-none prose-indigo prose-lg blog-content blog-layout">
            <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
          </div>
          
          {/* Author Info */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex items-start gap-4">
              <div className="bg-gray-700 rounded-full h-16 w-16 flex items-center justify-center text-xl font-bold text-indigo-300">
                {post.authorName.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-medium text-indigo-100">{post.authorName}</h3>
                <p className="text-indigo-300 mt-1 text-sm">
                  Healthcare content creator with expertise in medical information and health education.
                </p>
              </div>
            </div>
          </div>
          
          {/* Tags Section */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-700">
              <h3 className="text-lg font-medium text-indigo-200 mb-2">Related Topics</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Link 
                    key={index} 
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="bg-indigo-900/40 hover:bg-indigo-800/60 px-3 py-1.5 rounded-full text-sm text-indigo-300 hover:text-indigo-200 transition"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* Read More Section - Placeholder for related posts */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <h3 className="text-xl font-bold text-indigo-100 mb-6">More Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/40 rounded-lg p-4 hover:bg-gray-700/40 transition cursor-pointer">
                <h4 className="text-lg font-medium text-indigo-200">
                  Tips for Maintaining Heart Health
                </h4>
                <p className="text-sm text-indigo-300 mt-2 line-clamp-2">
                  Learn about the best practices for keeping your heart healthy through diet, exercise, and lifestyle changes.
                </p>
              </div>
              <div className="bg-gray-800/40 rounded-lg p-4 hover:bg-gray-700/40 transition cursor-pointer">
                <h4 className="text-lg font-medium text-indigo-200">
                  Understanding Mental Health
                </h4>
                <p className="text-sm text-indigo-300 mt-2 line-clamp-2">
                  Explore the fundamentals of mental health and discover strategies for maintaining psychological wellbeing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}