"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Bell, User, Menu, X, LogOut, Settings, BookOpen, Brain, Video, Gauge } from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Gauge },
  { name: 'Video Explanation', href: '/chat', icon: Video },
  { name: 'My Videos', href: '/videos', icon: BookOpen },
]

export function Navigation() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 shadow-md backdrop-blur-md' : 'bg-white/80 backdrop-blur-sm'
    } border-b border-gray-200/50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold gradient-text">
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block"
                >
                  Baby
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="inline-block"
                >
                  Newton
                </motion.span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 hover:text-primary ${
                    pathname === item.href
                      ? "text-primary font-semibold"
                      : "text-gray-600"
                  }`}
                >
                  <span className="flex items-center">
                    <item.icon className="mr-1 h-4 w-4" />
                    {item.name}
                  </span>
                  {pathname === item.href && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      layoutId="navbar-indicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Login/Signup buttons for desktop */}
            <div className="hidden sm:flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/auth/login" 
                  className="font-medium text-gray-600 hover:text-primary transition-colors"
                >
                  Log in
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/auth/signup" 
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  Sign up
                </Link>
              </motion.div>
            </div>
            
            <div className="sm:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <motion.div 
        className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white/90 backdrop-blur-md border-b border-gray-200/50">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === item.href
                  ? "text-primary bg-primary/10"
                  : "text-gray-600 hover:text-primary hover:bg-primary/5"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </div>
            </Link>
          ))}
          
          {/* Login/Signup buttons for mobile */}
          <div className="pt-2 pb-1 flex flex-col space-y-2">
            <Link
              href="/auth/login"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-primary/5 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <LogOut className="mr-3 h-5 w-5" />
                Log in
              </div>
            </Link>
            <Link
              href="/auth/signup" 
              className="block px-3 py-2 text-base font-medium bg-primary/10 text-primary hover:bg-primary/20 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <User className="mr-3 h-5 w-5" />
                Sign up
              </div>
            </Link>
          </div>
          
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">John Doe</div>
                <div className="text-sm font-medium text-gray-500">john@example.com</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <Link
                href="/profile"
                className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-primary/5 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center">
                  <User className="mr-3 h-5 w-5" />
                  Your Profile
                </div>
              </Link>
              <Link
                href="/settings"
                className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-primary/5 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center">
                  <Settings className="mr-3 h-5 w-5" />
                  Settings
                </div>
              </Link>
              <Link
                href="/auth/login"
                className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-primary/5 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center">
                  <LogOut className="mr-3 h-5 w-5" />
                  Sign out
                </div>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </nav>
  )
} 