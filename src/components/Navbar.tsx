'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Heart, Menu, X, User, MessageCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Handle hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't show navbar on auth pages
  if (!isClient || (pathname && (pathname.startsWith('/auth/')))) {
    return null;
  }

  const handleSignOut = () => {
    signOut();
    router.push('/auth/signin');
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: 'Home', href: '/', exact: true },
    { label: 'Features', href: '/#features' },
    ...(user ? [{ label: 'Chat', href: '/chat' }] : []),
    { label: 'Terms', href: '/terms' }
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Heart className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Healthcare Assistant</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${
                    (item.exact ? pathname === item.href : pathname && pathname.startsWith(item.href))
                      ? 'border-b-2 border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            {user ? (
              <>
                <Link href="/chat" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm flex items-center">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Chat Now
                </Link>
                <Link href="/profile">
                  <span className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-md shadow-sm mr-2">
                    My Profile
                  </span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-md shadow-sm"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <span className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-md shadow-sm">
                    Sign In
                  </span>
                </Link>
                <Link href="/auth/signup">
                  <span className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-blue-600 rounded-md shadow-sm">
                    Sign Up
                  </span>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${
                  (item.exact ? pathname === item.href : pathname && pathname.startsWith(item.href))
                    ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-700'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <User className="h-10 w-10 rounded-full bg-gray-100 p-2 text-gray-600" />
              </div>
              <div className="ml-3">
                {user ? (
                  <>
                    <div className="text-base font-medium text-gray-800">{user.name}</div>
                    <div className="text-sm font-medium text-gray-500">{user.email}</div>
                  </>
                ) : (
                  <>
                    <div className="text-base font-medium text-gray-800">Guest User</div>
                    <div className="text-sm font-medium text-gray-500">Not signed in</div>
                  </>
                )}
              </div>
            </div>
            
            <div className="mt-3 space-y-1">
              {user ? (
                <>
                  <Link 
                    href="/chat"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                      Chat Now
                    </span>
                  </Link>
                  <Link 
                    href="/profile"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                      Profile
                    </span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/auth/signin"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                      Sign In
                    </span>
                  </Link>
                  <Link 
                    href="/auth/signup"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                      Sign Up
                    </span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}