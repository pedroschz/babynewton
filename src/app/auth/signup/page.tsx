"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { MailIcon, UserIcon, LockIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account created",
        description: "Your account has been created successfully. Welcome to BabyNewton!",
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
            Join the constellation of young mathematicians where every equation is an adventure waiting to be solved!
          </p>
          
          <div className="mt-12 space-y-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-orange-100 rounded-full p-3">
                <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-800">Secure Platform</h3>
                <p className="mt-1 text-gray-600">Your child's data is always protected</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-orange-100 rounded-full p-3">
                <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-800">Educational Content</h3>
                <p className="mt-1 text-gray-600">Curriculum-aligned learning materials</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Signup form */}
      <div className="md:w-1/2 p-8 md:p-16 flex items-center justify-center">
        <div className="w-full">
          {/* Mobile logo - only visible on small screens */}
          <div className="md:hidden text-center mb-12">
            <h1 className="text-4xl font-bold text-orange-500">BabyNewton</h1>
            <p className="mt-2 text-gray-600">Create your account</p>
          </div>
          
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-xl text-gray-600">Begin your quest to unlock the mysteries of mathematics</p>
          </div>
          
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full name</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Create a secure password"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the <Link href="/terms" className="text-orange-500 hover:text-orange-600">Terms of Service</Link> and <Link href="/privacy" className="text-orange-500 hover:text-orange-600">Privacy Policy</Link>
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
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-10">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/auth/login"
                className="w-full flex justify-center py-3 px-4 border border-orange-300 rounded-md shadow-sm bg-white text-sm font-medium text-orange-500 hover:bg-orange-50"
              >
                Sign in to your account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 