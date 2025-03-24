"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { MailIcon, LockIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login successful",
        description: "Welcome back to BabyNewton!",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Colored background with branding */}
      <div className="md:w-1/2 bg-orange-50 p-8 md:p-16 flex items-center">
        <div>
          <h1 className="text-5xl font-bold text-orange-500">BabyNewton</h1>
          <p className="mt-6 text-xl text-gray-700">
            Welcome back, brilliant mind! Continue your mathematical journey where numbers become adventures.
          </p>
          
          <div className="mt-12 space-y-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-orange-100 rounded-full p-3">
                <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-800">Track Progress</h3>
                <p className="mt-1 text-gray-600">Pick up right where you left off</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-orange-100 rounded-full p-3">
                <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-800">Access All Lessons</h3>
                <p className="mt-1 text-gray-600">Unlock your personalized curriculum</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Login form */}
      <div className="md:w-1/2 p-8 md:p-16 flex items-center justify-center">
        <div className="w-full">
          {/* Mobile logo - only visible on small screens */}
          <div className="md:hidden text-center mb-12">
            <h1 className="text-4xl font-bold text-orange-500">BabyNewton</h1>
            <p className="mt-2 text-gray-600">Welcome back!</p>
          </div>
          
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Sign in</h2>
            <p className="mt-2 text-xl text-gray-600">Sign in to continue solving the universe's puzzles</p>
          </div>
          
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <Link href="/auth/forgot-password" className="text-sm text-orange-500 hover:text-orange-600">
                  Forgot password?
                </Link>
              </div>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="mt-10">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/auth/signup"
                className="w-full flex justify-center py-3 px-4 border border-orange-300 rounded-md shadow-sm bg-white text-sm font-medium text-orange-500 hover:bg-orange-50"
              >
                Create a new account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 