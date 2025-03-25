"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export default function LoginPage() {
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
        title: "Login successful",
        description: "Welcome back to BabyNewton!",
      });
      router.push('/chat');
    }, 1500);
  };

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-10">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-orange-200/20 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000" />
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
          <h2 className="text-3xl font-bold gradient-text">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </motion.div>

        <motion.form 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          onSubmit={handleSubmit}
        >
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
                placeholder="Enter your password"
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
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="h-4 w-4 text-primary focus:ring-primary/30 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <Link 
              href="/auth/forgot-password" 
              className="text-sm text-primary hover:text-primary-600 hover:underline transition-all"
            >
              Forgot password?
            </Link>
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
                Sign In
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
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link 
                href="/auth/signup" 
                className="text-primary hover:text-orange-600 font-medium hover:underline transition-all"
              >
                Sign up
              </Link>
            </p>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
} 