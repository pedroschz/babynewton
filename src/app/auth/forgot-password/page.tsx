"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
    <div className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-10">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-orange-200/20 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000" />
        <div className="absolute top-2/3 right-1/3 w-60 h-60 bg-primary/15 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-4000" />
      </div>

      <motion.div 
        className="glass-card max-w-md w-full mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold gradient-text">Reset Password</h2>
          <p className="text-gray-600 mt-2">Enter your email to receive a reset link</p>
        </motion.div>

        {!isEmailSent ? (
          <motion.form 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            onSubmit={handleSubmit}
          >
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input-field pl-10"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            <motion.button 
              type="submit" 
              className="btn-primary w-full flex items-center justify-center py-3 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="loading-spinner w-5 h-5"></div>
              ) : (
                <>
                  Send Reset Link
                  <svg 
                    className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </motion.button>

            <motion.div 
              className="text-center mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link 
                href="/auth/login" 
                className="text-primary hover:text-orange-600 font-medium hover:underline transition-all inline-flex items-center"
              >
                <svg 
                  className="mr-2 h-4 w-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                Back to Login
              </Link>
            </motion.div>
          </motion.form>
        ) : (
          <motion.div 
            className="text-center space-y-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-gray-900">Check Your Email</h3>
              <p className="mt-2 text-gray-600">
                We've sent a password reset link to your email address. Please check your inbox.
              </p>
            </div>
            
            <div className="pt-4">
              <p className="text-sm text-gray-500">
                Didn't receive the email? Check your spam folder or{' '}
                <button 
                  type="button"
                  onClick={() => setIsEmailSent(false)}
                  className="text-primary hover:text-orange-600 font-medium hover:underline transition-all"
                >
                  try again
                </button>
              </p>
            </div>
            
            <motion.div className="pt-4">
              <Link 
                href="/auth/login" 
                className="btn-primary inline-flex items-center justify-center py-2.5 px-6"
              >
                Return to Login
              </Link>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
} 