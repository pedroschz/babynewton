"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Brain, MessageSquare, Video, VolumeX, Calculator, ChevronRight, PlusCircle, Zap, Sparkles, Plus, Divide, Asterisk, Percent, X, Minus, Hash } from 'lucide-react'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const featureCards = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Our AI analyzes your math problem and generates a step-by-step solution with visual explanations.",
    color: "bg-primary/10",
    textColor: "text-primary",
    delay: 0
  },
  {
    icon: Video,
    title: "Beautiful Animations",
    description: "Watch your math problems come to life with stunning animations created using Manim.",
    color: "bg-orange-300/10",
    textColor: "text-orange-500",
    delay: 0.1
  },
  {
    icon: VolumeX,
    title: "Voice Explanations",
    description: "Listen to clear, natural voice explanations that guide you through each step.",
    color: "bg-blue-300/10",
    textColor: "text-blue-500",
    delay: 0.2
  },
  {
    icon: MessageSquare,
    title: "Ask Questions",
    description: "Need more clarity? Chat with our AI tutor to deepen your understanding.",
    color: "bg-green-300/10",
    textColor: "text-green-500",
    delay: 0.3
  }
];

// Math symbols for cursor particles
const mathSymbols = [Plus, Minus, Divide, Asterisk, Percent, X, Hash];

// Additional math formulas and elements
const mathFormulas = [
  '∫e^x = e^x + C',
  'E = mc²',
  'a² + b² = c²',
  'F = G(m₁m₂)/r²',
  '∇ × E = -∂B/∂t',
  'e^iπ + 1 = 0',
  'dx/dt = v'
];

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorElements, setCursorElements] = useState<Array<{id: number, x: number, y: number, scale: number, rotation: number, opacity: number, Component: any}>>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Smooth cursor following
  const springConfig = { damping: 25, stiffness: 200 };
  const smoothCursorX = useSpring(cursorX, springConfig);
  const smoothCursorY = useSpring(cursorY, springConfig);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const featuresRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 });

  const [mathFormula, setMathFormula] = useState(mathFormulas[0]);
  const [mathNodes, setMathNodes] = useState<Array<{id: number, x: number, y: number, scale: number, formula: string}>>([]);
  const lastNodeTime = useRef(0);
  const formulaIndex = useRef(0);

  // For cursor followers
  const cursorFollowers = useRef<{x: number, y: number, opacity: number, scale: number}[]>(
    Array.from({ length: 8 }).map((_, i) => ({
      x: 0, 
      y: 0, 
      opacity: 0.3 + (i / 8) * 0.7,
      scale: 0.5 + (i / 8) * 0.5
    }))
  );

  // Add an extra math-themed interaction
  const [equation, setEquation] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const equationInputRef = useRef<HTMLInputElement>(null);

  const handleSolveEquation = (e: React.FormEvent) => {
    e.preventDefault();
    if (equation.trim()) {
      setShowSolution(true);
      // Simulate auto-focusing back to the input after showing the solution
      setTimeout(() => {
        if (equationInputRef.current) {
          equationInputRef.current.focus();
        }
      }, 100);
    }
  };

  // Equations and solutions for demo
  const getEquationSolution = (eq: string) => {
    // This is just a simple demo - would be replaced with actual math solver in a real app
    const simpleEquations: Record<string, string> = {
      'x^2-4x+4=0': 'x = 2 (double root)',
      'x^2-9=0': 'x = ±3',
      'x^2+2x+1=0': 'x = -1 (double root)',
      '2x+3=7': 'x = 2',
      'x^2-5x+6=0': 'x = 2 or x = 3',
      '3x-6=0': 'x = 2',
      'x^3-x=0': 'x = 0, x = 1, or x = -1',
    };
    
    const normalizedEq = eq.replace(/\s+/g, '').toLowerCase();
    
    if (simpleEquations[normalizedEq]) {
      return simpleEquations[normalizedEq];
    }
    
    return "I'll solve this step by step in a full explanation";
  };

  useEffect(() => {
    let animationFrameId: number;
    let particleTimeout: NodeJS.Timeout;
    let lastParticleTime = 0;
    const particleInterval = 150; // ms between particle spawns
    const maxParticles = 20;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Update regular cursor position for radial gradient
      setMousePosition({ x: clientX, y: clientY });
      
      // Update framer motion values for advanced cursor
      cursorX.set(clientX);
      cursorY.set(clientY);

      // Generate particles on movement, but limit frequency
      const now = Date.now();
      if (now - lastParticleTime > particleInterval) {
        lastParticleTime = now;
        
        const randomSymbolIndex = Math.floor(Math.random() * mathSymbols.length);
        const randomSymbol = mathSymbols[randomSymbolIndex];
        
        // Add new particle
        setCursorElements(prev => {
          const newElements = [...prev, {
            id: now,
            x: clientX,
            y: clientY,
            scale: 0.5 + Math.random() * 0.5,
            rotation: Math.random() * 360,
            opacity: 0.7 + Math.random() * 0.3,
            Component: randomSymbol
          }];
          
          // Keep only the most recent particles
          if (newElements.length > maxParticles) {
            return newElements.slice(newElements.length - maxParticles);
          }
          return newElements;
        });
      }
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop for particles
    const animateParticles = () => {
      setCursorElements(prev => 
        prev.map(element => ({
          ...element,
          y: element.y - 1, // Float upward
          opacity: element.opacity - 0.01, // Fade out
          rotation: element.rotation + 1, // Rotate
          scale: element.scale - 0.005 // Shrink slightly
        })).filter(element => element.opacity > 0) // Remove completely faded elements
      );
      
      animationFrameId = requestAnimationFrame(animateParticles);
    };
    
    animationFrameId = requestAnimationFrame(animateParticles);

    // Add math formulas at random intervals when cursor is idle
    const mathNodeInterval = 2000; // ms between adding math nodes
    
    // Function to add math formula nodes
    const addMathNode = () => {
      const now = Date.now();
      if (now - lastNodeTime.current > mathNodeInterval) {
        lastNodeTime.current = now;
        
        // Get next formula
        formulaIndex.current = (formulaIndex.current + 1) % mathFormulas.length;
        setMathFormula(mathFormulas[formulaIndex.current]);
        
        // Add at a slight offset from cursor
        const offsetX = (Math.random() - 0.5) * 300;
        const offsetY = (Math.random() - 0.5) * 300;
        
        setMathNodes(prev => {
          const newNodes = [...prev, {
            id: now,
            x: cursorX.get() + offsetX,
            y: cursorY.get() + offsetY,
            scale: 0.2 + Math.random() * 0.8,
            formula: mathFormulas[Math.floor(Math.random() * mathFormulas.length)]
          }];
          
          return newNodes.slice(-5); // Keep only the last 5 formula nodes
        });
      }
    };
    
    // Set interval to add math nodes
    const mathNodeTimer = setInterval(addMathNode, mathNodeInterval);

    // Animation function that updates cursor followers with delay
    const animateFollowers = () => {
      const followers = cursorFollowers.current;
      const currentX = cursorX.get();
      const currentY = cursorY.get();
      
      // Update each follower with increasing lag
      followers.forEach((follower, i) => {
        // Add more lag for followers further in the chain
        const lag = 0.1 + (i * 0.05);
        follower.x = follower.x + (currentX - follower.x) * lag;
        follower.y = follower.y + (currentY - follower.y) * lag;
      });
      
      requestAnimationFrame(animateFollowers);
    };
    
    // Start animation loop
    const animationId = requestAnimationFrame(animateFollowers);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      cancelAnimationFrame(animationId);
      if (particleTimeout) clearTimeout(particleTimeout);
      
      // New cleanup
      clearInterval(mathNodeTimer);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden relative">
      {/* Custom cursor effects */}
      <motion.div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
        style={{ perspective: 1000 }}
      >
        {/* Floating math symbols */}
        {cursorElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute text-primary pointer-events-none"
            initial={{ x: element.x, y: element.y, opacity: element.opacity, scale: element.scale, rotate: element.rotation }}
            animate={{ opacity: 0, y: element.y - 100, scale: element.scale * 0.5, rotate: element.rotation + 180 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <element.Component size={24} />
          </motion.div>
        ))}
        
        {/* Cursor followers (small orbiting dots) */}
        {cursorFollowers.current.map((follower, i) => (
          <motion.div
            key={`follower-${i}`}
            className="absolute w-2 h-2 rounded-full bg-primary/30 pointer-events-none"
            style={{
              x: follower.x,
              y: follower.y,
              translateX: '-50%',
              translateY: '-50%',
              opacity: follower.opacity,
              scale: follower.scale
            }}
          />
        ))}
        
        {/* Large moving math formula nodes */}
        {mathNodes.map((node) => (
          <motion.div
            key={node.id}
            className="absolute text-sm font-mono text-primary/20 pointer-events-none"
            initial={{ 
              x: node.x, 
              y: node.y, 
              scale: 0.5,
              opacity: 0.1
            }}
            animate={{ 
              x: node.x + (Math.random() - 0.5) * 100,
              y: node.y + (Math.random() - 0.5) * 100,
              scale: node.scale,
              opacity: 0.5,
              rotateZ: Math.random() * 20 - 10
            }}
            transition={{ 
              duration: 15 + Math.random() * 5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            {node.formula}
          </motion.div>
        ))}
      </motion.div>

      <main className="flex-1">
        {/* Hero section */}
        <section ref={heroRef} className="relative pt-28 pb-20 px-4 md:pt-36 md:pb-28 overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-white via-orange-50 to-primary/5 z-0" 
            style={{ 
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(249, 115, 22, 0.15) 0%, rgba(255, 255, 255, 0) 60%)` 
            }}
          />
          
          {/* Interactive connect-the-dots grid that responds to cursor */}
          <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-12">
              {Array.from({ length: 13 * 13 }).map((_, i) => {
                const col = i % 13;
                const row = Math.floor(i / 13);
                const x = (col / 12) * 100;
                const y = (row / 12) * 100;
                
                return (
                  <motion.div
                    key={`dot-${i}`}
                    className="absolute w-1 h-1 bg-primary rounded-full"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      scale: useTransform(
                        smoothCursorX,
                        [0, window.innerWidth],
                        [
                          1 - Math.abs(x - (mousePosition.x / window.innerWidth * 100)) * 0.01,
                          1 + Math.abs(x - (mousePosition.x / window.innerWidth * 100)) * 0.01
                        ]
                      ),
                      opacity: useTransform(
                        smoothCursorY,
                        [0, window.innerHeight],
                        [
                          0.5 - Math.abs(y - (mousePosition.y / window.innerHeight * 100)) * 0.005,
                          0.5 + Math.abs(y - (mousePosition.y / window.innerHeight * 100)) * 0.005
                        ]
                      )
                    }}
                  />
                );
              })}
            </div>
          </div>
          
          {/* Magic Math equation following cursor - enhanced */}
          <motion.div 
            className="absolute text-xl md:text-3xl text-primary/20 font-mono pointer-events-none mix-blend-multiply z-0"
            style={{
              x: smoothCursorX,
              y: smoothCursorY,
              translateX: '-50%',
              translateY: '-50%',
              rotateY: useTransform(smoothCursorX, [0, window.innerWidth], [20, -20]),
              rotateX: useTransform(smoothCursorY, [0, window.innerHeight], [-20, 20]),
            }}
          >
            <motion.span 
              style={{ 
                opacity: useTransform(
                  smoothCursorY, 
                  [0, window.innerHeight], 
                  [0.1, 0.5]
                ) 
              }}
              key={mathFormula}
              initial={{ opacity: 0.1, scale: 0.8 }}
              animate={{ opacity: 0.3, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span dangerouslySetInnerHTML={{ __html: mathFormula.replace(/\^(\w+)/g, '<sup>$1</sup>') }} />
            </motion.span>
          </motion.div>
          
          {/* Existing floating blobs with enhanced behaviors */}
          <motion.div 
            className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
            animate={{ 
              x: [0, 30, -20, 0],
              y: [0, -50, 20, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              x: useTransform(smoothCursorX, [0, window.innerWidth], [-20, 20]),
              scaleX: useTransform(smoothCursorX, [0, window.innerWidth/2, window.innerWidth], [0.9, 1.2, 0.9]),
              scaleY: useTransform(smoothCursorY, [0, window.innerHeight/2, window.innerHeight], [0.9, 1.2, 0.9]),
            }}
          />
          
          <motion.div 
            className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            animate={{ 
              x: [0, -30, 20, 0],
              y: [0, 50, -20, 0],
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{ 
              duration: 18,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 2
            }}
          />
          
          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial="hidden"
                animate={heroInView ? "visible" : "hidden"}
                variants={staggerContainer}
              >
                <motion.h1 
                  className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl gradient-text"
                  variants={fadeInUp}
                  transition={{ duration: 0.6 }}
                >
                  AI-Powered Math Education
                </motion.h1>
                <motion.p 
                  className="mt-6 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto"
                  variants={fadeInUp}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Transform mathematical problems into engaging video explanations with AI-powered animations and voiceovers.
                </motion.p>
                <motion.div 
                  className="mt-10 flex flex-wrap gap-4 justify-center"
                  variants={fadeInUp}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Link 
                    href="/dashboard" 
                    className="btn-primary inline-flex items-center group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      Get Started <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 translate-y-[100%] bg-white/20 group-hover:translate-y-[0%] transition-transform duration-300" />
                  </Link>
                  <Link 
                    href="#how-it-works" 
                    className="btn-secondary inline-flex items-center group"
                  >
                    <span className="flex items-center">
                      Learn More
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity,
                          repeatType: "loop"
                        }}
                      >
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </motion.div>
                    </span>
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div 
                className="mt-16 bg-white/50 backdrop-blur-md p-6 rounded-xl border border-gray-200/50 shadow-lg max-w-xl mx-auto"
                initial={{ opacity: 0, y: 40 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <Calculator className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-800">Try it now</h3>
                    <p className="text-sm text-gray-600">Enter a math problem to see the magic</p>
                  </div>
                </div>
                
                <form onSubmit={handleSolveEquation} className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      ref={equationInputRef}
                      type="text"
                      placeholder="e.g., x^2 - 4x + 4 = 0"
                      className="input-field flex-1 shadow-inner"
                      value={equation}
                      onChange={(e) => setEquation(e.target.value)}
                    />
                    <Button 
                      type="submit"
                      className="bg-primary/90 hover:bg-primary transition-colors"
                      disabled={!equation.trim()}
                    >
                      <Zap className="h-4 w-4 mr-2" /> Solve
                    </Button>
                  </div>
                  
                  {/* Animated solution display */}
                  <AnimatePresence>
                    {showSolution && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: 10 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white/70 rounded-lg border border-primary/10 p-4"
                      >
                        <div className="flex items-start">
                          <div className="bg-primary/10 rounded-full p-1 mr-2">
                            <Sparkles className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Solution:</p>
                            <p className="text-md font-mono">{getEquationSolution(equation)}</p>
                          </div>
                        </div>
                        
                        <div className="mt-2 flex justify-end">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs text-primary hover:bg-primary/10"
                            onClick={() => {
                              setShowSolution(false);
                              setEquation('');
                            }}
                          >
                            <X className="h-3 w-3 mr-1" /> Clear
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How it works section */}
        <section 
          id="how-it-works" 
          ref={featuresRef}
          className="py-16 bg-gradient-to-b from-white to-gray-50"
        >
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold gradient-text">How It Works</h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                Our platform uses AI to make math learning visual, interactive, and enjoyable.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate={featuresInView ? "visible" : "hidden"}
            >
              {featureCards.map((card, index) => (
                <motion.div 
                  key={index}
                  className="glass-card hover-lift group"
                  variants={fadeInUp}
                  transition={{ duration: 0.5, delay: card.delay }}
                  whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
                >
                  <div className={`rounded-full ${card.color} w-12 h-12 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110`}>
                    <card.icon className={`h-6 w-6 ${card.textColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{card.title}</h3>
                  <p className="text-gray-600">{card.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section ref={ctaRef} className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white z-0" />
          
          <motion.div 
            className="absolute -right-20 -top-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-60"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.6, 0.3, 0.6],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          
          <motion.div 
            className="absolute -left-20 -bottom-20 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl opacity-60"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.6, 0.3, 0.6],
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 4 }}
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-2xl mx-auto text-center glass-card py-10 px-6"
              initial={{ opacity: 0, y: 40 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.7 }}
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            >
              <div className="inline-block p-3 rounded-full bg-primary/10 mb-6">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Math Learning?</h2>
              <p className="text-lg mb-8 text-gray-700">Join thousands of students who are already learning math in a whole new way.</p>
              <Link 
                href="/auth/signup" 
                className="btn-primary inline-flex items-center px-8 py-3 shadow-lg group"
              >
                <span className="flex items-center">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Start Your Free Trial
                </span>
                <motion.div
                  className="ml-2"
                  animate={{ 
                    x: [0, 5, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      
      <footer className="py-8 px-4 border-t border-gray-200/70">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p 
              className="text-sm text-gray-500"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              © 2025 BabyNewton. All rights reserved.
            </motion.p>
            <motion.div 
              className="flex gap-4 mt-4 md:mt-0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Terms</Link>
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Privacy</Link>
              <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Contact</Link>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  )
} 