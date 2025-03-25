"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account created",
        description: "Welcome to BabyNewton! Your account has been created successfully.",
      });
      router.push('/chat');
    }, 1500);
  };

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-10">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-orange-200/20 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 right-1/4 w-60 h-60 bg-primary/15 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-4000" />
      </div>

      <motion.div 
        className="glass-card max-w-md w-full mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="text-center mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold gradient-text">Create Account</h2>
          <p className="text-gray-600 mt-2">Join our community of math enthusiasts</p>
        </motion.div>

        <motion.form 
          className="space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          onSubmit={handleSubmit}
        >
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                className="input-field pl-10"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
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
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="input-field pl-10 pr-10"
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-400 hover:text-primary" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400 hover:text-primary" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Must be at least 8 characters long
            </p>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              className="h-4 w-4 text-primary focus:ring-primary/30 border-gray-300 rounded"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the{' '}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>

          <motion.button 
            type="submit" 
            className="btn-primary w-full flex items-center justify-center py-3 mt-4 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loading-spinner w-5 h-5"></div>
            ) : (
              <>
                Create Account
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
            className="text-center mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link 
                href="/auth/login" 
                className="text-primary hover:text-orange-600 font-medium hover:underline transition-all"
              >
                Sign in
              </Link>
            </p>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
} 