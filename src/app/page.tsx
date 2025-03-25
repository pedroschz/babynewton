"use client"

import { useRef, useState, useEffect, useMemo } from 'react'
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

// Client-side only cursor effects component
const CursorEffects = ({ windowSize, mousePosition }) => {
  if (typeof window === 'undefined') return null;
  
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorX = useMotionValue(mousePosition.x);
  const cursorY = useMotionValue(mousePosition.y);
  
  // Smooth cursor following
  const springConfig = { damping: 25, stiffness: 200 };
  const smoothCursorX = useSpring(cursorX, springConfig);
  const smoothCursorY = useSpring(cursorY, springConfig);

  const [mathFormula, setMathFormula] = useState(mathFormulas[0]);
  const [mathNodes, setMathNodes] = useState<Array<{id: number, x: number, y: number, scale: number, formula: string}>>([]);
  const [cursorElements, setCursorElements] = useState<Array<{id: number, x: number, y: number, scale: number, rotation: number, opacity: number, Component: any}>>([]);
  
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

  // Effect for mouse and cursor animation
  useEffect(() => {
    let animationFrameId: number;
    let particleTimeout: NodeJS.Timeout;
    let lastParticleTime = 0;
    const particleInterval = 150; // ms between particle spawns
    const maxParticles = 20;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
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
  );
};

// Interactive grid component
const InteractiveGrid = ({ windowSize, mousePosition, smoothCursorX, smoothCursorY }) => {
  if (typeof window === 'undefined' || windowSize.width === 0) return null;
  
  const [gridDots, setGridDots] = useState([]);
  
  // Update grid dots based on cursor position
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const dots = Array.from({ length: 13 * 13 }).map((_, i) => {
      const col = i % 13;
      const row = Math.floor(i / 13);
      const x = (col / 12) * 100;
      const y = (row / 12) * 100;
      
      // Calculate scale based on cursor position
      const distanceFromCursorX = Math.abs(x - (mousePosition.x / windowSize.width * 100));
      const distanceFromCursorY = Math.abs(y - (mousePosition.y / windowSize.height * 100));
      
      const scale = 1 + (1 - Math.min(distanceFromCursorX, 100) / 100) * 0.5;
      const opacity = 0.5 + (1 - Math.min(distanceFromCursorY, 100) / 100) * 0.5;
      
      return { 
        key: `dot-${i}`, 
        x, 
        y, 
        scale, 
        opacity 
      };
    });
    
    setGridDots(dots);
  }, [mousePosition.x, mousePosition.y, windowSize.width, windowSize.height]);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12">
        {gridDots.map((dot) => (
          <motion.div
            key={dot.key}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              scale: dot.scale,
              opacity: dot.opacity
            }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>
    </div>
  );
};

// Math equation component
const MathEquation = ({ windowSize, smoothCursorX, smoothCursorY, mathFormula }) => {
  if (typeof window === 'undefined' || windowSize.width === 0) return null;
  
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [opacity, setOpacity] = useState(0.2);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Calculate rotations based on cursor position
    const newRotationY = 20 - (smoothCursorX.get() / windowSize.width) * 40;
    const newRotationX = -20 + (smoothCursorY.get() / windowSize.height) * 40;
    const newOpacity = 0.1 + (smoothCursorY.get() / windowSize.height) * 0.4;
    
    setRotationY(newRotationY);
    setRotationX(newRotationX);
    setOpacity(newOpacity);
    
    // Set up a subscription to smoothCursorX/Y changes
    const unsubscribeX = smoothCursorX.onChange((value) => {
      setRotationY(20 - (value / windowSize.width) * 40);
    });
    
    const unsubscribeY = smoothCursorY.onChange((value) => {
      setRotationX(-20 + (value / windowSize.height) * 40);
      setOpacity(0.1 + (value / windowSize.height) * 0.4);
    });
    
    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [smoothCursorX, smoothCursorY, windowSize.width, windowSize.height]);
  
  return (
    <motion.div 
      className="absolute text-xl md:text-3xl text-primary/20 font-mono pointer-events-none mix-blend-multiply z-0"
      style={{
        x: smoothCursorX,
        y: smoothCursorY,
        translateX: '-50%',
        translateY: '-50%',
        rotateY: rotationY,
        rotateX: rotationX,
      }}
    >
      <motion.span 
        style={{ opacity }}
        key={mathFormula}
        initial={{ opacity: 0.1, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span dangerouslySetInnerHTML={{ __html: mathFormula.replace(/\^(\w+)/g, '<sup>$1</sup>') }} />
      </motion.span>
    </motion.div>
  );
};

// Client-side cursor wrapper for safer loading
const ClientSideCursor = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    return () => {
      setIsMounted(false);
    };
  }, []);
  
  if (!isMounted) return null;
  
  return <>{children}</>;
};

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // For window-based calculations
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isClient, setIsClient] = useState(false);

  // Add an extra math-themed interaction
  const [equation, setEquation] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const equationInputRef = useRef<HTMLInputElement>(null);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const featuresRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });

  // For framer motion values in client components
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200 };
  const smoothCursorX = useSpring(cursorX, springConfig);
  const smoothCursorY = useSpring(cursorY, springConfig);

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

  // Effect for window size and mouse position
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Update window size
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
      cursorX.set(clientX);
      cursorY.set(clientY);
    };
    
    // Set initial size
    handleResize();
    setIsClient(true);
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden relative">
      {/* Custom cursor effects - client-side only */}
      {isClient && windowSize.width > 0 && (
        <ClientSideCursor>
          <CursorEffects windowSize={windowSize} mousePosition={mousePosition} />
        </ClientSideCursor>
      )}
      
      <main className="flex-1">
        {/* Hero section */}
        <section ref={heroRef} className="relative py-20 px-4 md:py-28 overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-white via-orange-50 to-primary/5 z-0" 
            style={{ 
              background: isClient ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(249, 115, 22, 0.15) 0%, rgba(255, 255, 255, 0) 60%)` : undefined
            }}
          />
          
          {/* Interactive connect-the-dots grid that responds to cursor */}
          {isClient && windowSize.width > 0 && (
            <ClientSideCursor>
              <InteractiveGrid 
                windowSize={windowSize} 
                mousePosition={mousePosition} 
                smoothCursorX={smoothCursorX} 
                smoothCursorY={smoothCursorY} 
              />
            </ClientSideCursor>
          )}
          
          {/* Magic Math equation following cursor - enhanced */}
          {isClient && windowSize.width > 0 && (
            <ClientSideCursor>
              <MathEquation 
                windowSize={windowSize} 
                smoothCursorX={smoothCursorX} 
                smoothCursorY={smoothCursorY} 
                mathFormula={mathFormulas[0]} // Just use the first one
              />
            </ClientSideCursor>
          )}
          
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
                  className="mt-6 text-lg md:text-xl leading-relaxed text-gray-600"
                  variants={fadeInUp}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Experience intuitive learning with Baby Newton's interactive visual explanations, dynamic animations,
                  and step-by-step solutions for any math problem.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Math problem solver */}
        <section className="relative py-16 px-4 z-10">
          <div className="container mx-auto">
            {/* Orange shadow positioned behind the solver */}
            <div className="absolute inset-0 -z-0 pointer-events-none overflow-hidden">
              <div 
                className="absolute top-1/2 left-1/2 w-[90vw] md:w-[600px] h-[90vw] md:h-[600px] max-w-full max-h-full bg-primary/15 rounded-full filter blur-[100px] opacity-70"
                style={{ 
                  transform: isClient ? `translate(-50%, -50%) translate(${mousePosition.x/10}px, ${mousePosition.y/10}px)` : 'translate(-50%, -50%)' 
                }}
              />
            </div>
            
            <Card className="max-w-3xl mx-auto glass-card bg-white/90 backdrop-blur-md shadow-xl border-0 relative z-10">
              <CardContent className="p-6 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
                  <span className="text-primary">Generate</span> video explanations
                </h2>
                
                <form onSubmit={handleSolveEquation} className="space-y-4">
                  <div className="flex items-center">
                    <div className="relative flex-1">
                      <Calculator className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        ref={equationInputRef}
                        type="text"
                        value={equation}
                        onChange={(e) => setEquation(e.target.value)}
                        placeholder="Enter an equation (e.g., x^2-4x+4=0)"
                        className="w-full pl-10 pr-4 py-3 h-12 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white/90 backdrop-blur-sm"
                      />
                </div>
                    <Button 
                      type="submit" 
                      className="rounded-l-none flex items-center gap-2 h-12 text-white"
                    >
                      Video Explanation
                      <Video className="h-4 w-4" />
                    </Button>
              </div>
                </form>
                
                <AnimatePresence>
                  {showSolution && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6"
                    >
                      <Card className="bg-primary/5 border-0">
                        <CardContent className="p-4 md:p-6">
                          <div className="flex items-start gap-4">
                            <div className="bg-primary/10 rounded-full p-2">
                              <Sparkles className="h-5 w-5 text-primary" />
                </div>
                            <div>
                              <h3 className="text-lg font-medium text-gray-800">Solution:</h3>
                              <p className="mt-1 text-gray-600 font-mono">
                                {getEquationSolution(equation)}
                              </p>
                              <p className="mt-4 text-sm text-gray-500">
                                Want a detailed explanation? <Link href="/chat" className="text-primary hover:underline">View step-by-step video →</Link>
                              </p>
              </div>
            </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Features section */}
        <section id="features" ref={featuresRef} className="relative py-16 px-4 z-10">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
              >
                A <span className="text-primary">smarter way</span> to learn mathematics
              </motion.h2>
              <motion.p 
                className="mt-4 text-lg text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Baby Newton combines powerful AI, beautiful visualizations, and intuitive explanations 
                to make learning math enjoyable and effective.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featureCards.map((feature, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.1 + feature.delay }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-full ${feature.color} flex items-center justify-center mb-4`}>
                        <feature.icon className={`h-6 w-6 ${feature.textColor}`} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
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
  );
} 