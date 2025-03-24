"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { MailIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEmailSent(true);
      toast({
        title: "Reset link sent",
        description: "If an account exists with this email, you'll receive a password reset link.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side - Orange background with branding */}
      <div className="hidden md:flex md:w-1/3 bg-orange-50 items-center justify-center">
        <div className="p-12">
          <h1 className="text-5xl font-bold text-orange-500">BabyNewton</h1>
          <p className="mt-6 text-xl text-gray-700">
            Even Einstein forgot things sometimes! Let's get you back to solving the universe's puzzles.
          </p>
          
          <div className="mt-12 space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-orange-100 rounded-full p-3">
                <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-800">Secure Reset Process</h3>
                <p className="mt-1 text-gray-600">Your information is always protected</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-orange-100 rounded-full p-3">
                <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-800">Check Your Email</h3>
                <p className="mt-1 text-gray-600">We'll send instructions to reset your password</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Password reset form */}
      <div className="w-full md:w-2/3 flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          {/* Mobile logo - only visible on small screens */}
          <div className="md:hidden text-center mb-10">
            <h1 className="text-4xl font-bold text-orange-500">BabyNewton</h1>
            <p className="mt-2 text-gray-600">Reset your password</p>
          </div>
          
          {!isEmailSent ? (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
                <p className="mt-2 text-gray-600">We'll help you recover access to your mathematical playground</p>
              </div>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
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
                  <p className="mt-2 text-sm text-gray-500">
                    We'll send a link to this email address to reset your password
                  </p>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      "Send Reset Link"
                    )}
                  </button>
                </div>
              </form>
              
              <div className="mt-6 flex items-center justify-center">
                <Link
                  href="/auth/login"
                  className="flex items-center text-sm text-orange-500 hover:text-orange-600"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to login
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900">Check your email</h2>
              <p className="mt-4 text-gray-600">
                We've sent a password reset link to your email address.
                Please check your inbox and follow the instructions.
              </p>
              
              <div className="mt-8 space-y-4">
                <p className="text-sm text-gray-500">
                  Didn't receive the email?{' '}
                  <button
                    type="button"
                    onClick={() => setIsEmailSent(false)}
                    className="text-orange-500 hover:text-orange-600 font-medium"
                  >
                    Try again
                  </button>
                </p>
                
                <Link
                  href="/auth/login"
                  className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Return to login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 