"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ArrowDown, Sparkles, Lightbulb, X, Check, Info, CornerDownLeft, Video, KeyRound, Eye, EyeOff, LockKeyhole, Code, FileCode, BookOpen, Play, Download, Copy, CheckCircle2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const exampleQuestions = [
  "Show me how to find the derivative of sin(x)?",
  "Create a video explaining the chain rule",
  "Help me solve this integral: ∫x² dx",
  "Can you explain the quadratic formula with visual steps?"
];

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { 
      sender: "bot", 
      content: "Hi! I'm your math video explanation assistant. I'll create detailed explanations with step-by-step solutions and animations for any math problem.\n\nJust type your question, and I'll generate:\n\n1. **Detailed explanation** with steps\n2. **Video script** for a clear voiceover\n3. **Interactive animations** that visualize the solution\n\nTry one of the example questions or enter your own math problem!", 
      timestamp: new Date().toISOString() 
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [runningManimCode, setRunningManimCode] = useState<{messageIndex: number, animationId: string} | null>(null);
  const [videoResults, setVideoResults] = useState<{[key: string]: {url: string, thumbnail: string, status: 'processing' | 'ready' | 'failed'}}>({});
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    if (apiKey.trim() === "") {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key to generate explanations.",
        variant: "destructive"
      });
      return;
    }

    // Add user message
    const userMessage = { 
      sender: "user", 
      content: inputValue, 
      timestamp: new Date().toISOString() 
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    setIsProcessing(true);

    try {
      // Call OpenAI API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: `You are an expert math tutor specialized in creating video explanations. 
              For each math problem or concept, provide:
              1. A detailed explanation with steps,
              2. A script for the video explanation (marked with {captionscript} and {/captionscript}),
              3. MANIM animation code to visualize the solution (marked with {manim} and {/manim}).
              Format all mathematical notation properly. Be thorough and educational.
              Make sure your MANIM code is correct and can be executed without errors.
              The MANIM code should follow best practices and create a polished animation.`
            },
            ...messages
              .filter(msg => msg.sender !== "bot" || msg.content.includes("Hi! I'm your math"))
              .map(msg => ({
                role: msg.sender === "bot" ? "assistant" : "user",
                content: msg.content
              })),
            {
              role: "user",
              content: inputValue
            }
          ],
          temperature: 0.7,
          max_tokens: 3000
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'API request failed');
      }

      const data = await response.json();
      const botResponse = data.choices[0].message.content;

      // Add bot response
      setMessages(prev => [
        ...prev, 
        { 
          sender: "bot", 
          content: botResponse, 
          timestamp: new Date().toISOString() 
        }
      ]);
    } catch (error) {
      console.error('API call failed:', error);
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate explanation. Please check your API key and try again.",
        variant: "destructive"
      });
      
      // Add error message
      setMessages(prev => [
        ...prev, 
        { 
          sender: "bot", 
          content: "Sorry, I encountered an error while generating your explanation. Please check your API key and try again.", 
          timestamp: new Date().toISOString() 
        }
      ]);
    } finally {
      setIsTyping(false);
      setIsProcessing(false);
    }
  };

  const handleRunManimCode = async (code: string, messageIndex: number) => {
    // Generate a unique ID for this animation that includes the message index
    const animationId = `manim-${messageIndex}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    // Update state to show we're processing this code
    setRunningManimCode({ messageIndex, animationId });
    setVideoResults(prev => ({
      ...prev,
      [animationId]: {
        url: '',
        thumbnail: '/images/manim-processing.jpg', // Default processing thumbnail
        status: 'processing'
      }
    }));
    
    // Simulate API call to Manim server
    try {
      // In a real app, you would make an API call to a backend server
      // that would run the Manim code and return a video URL
      // For this demo, we'll simulate a successful response after a delay
      
      toast({
        title: "Processing Manim Code",
        description: "Your animation is being generated. This may take a few moments.",
      });
      
      // Simulate API processing delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate successful video generation
      const simulatedVideoUrl = '/videos/sample-math-animation.mp4'; // Path to a sample math animation video
      const simulatedThumbnailUrl = '/images/manim-thumbnail.jpg'; // Path to a sample thumbnail
      
      // Update video results with the new video
      setVideoResults(prev => ({
        ...prev,
        [animationId]: {
          url: simulatedVideoUrl,
          thumbnail: simulatedThumbnailUrl,
          status: 'ready'
        }
      }));
      
      toast({
        title: "Animation Ready",
        description: "Your math animation has been successfully generated!",
      });
    } catch (error) {
      console.error('Manim execution failed:', error);
      
      // Update state to show failure
      setVideoResults(prev => ({
        ...prev,
        [animationId]: {
          ...prev[animationId],
          status: 'failed'
        }
      }));
      
      toast({
        title: "Animation Failed",
        description: "There was an error generating your animation. Please check the code and try again.",
        variant: "destructive"
      });
    } finally {
      // Clear the running state
      setRunningManimCode(null);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
      
      toast({
        title: "Code Copied",
        description: "The Manim code has been copied to your clipboard.",
      });
    });
  };

  const handleDownloadVideo = (videoUrl: string) => {
    // In a real application, this would trigger a download of the actual video
    // For this demo, we'll just open the video in a new tab
    window.open(videoUrl, '_blank');
    
    toast({
      title: "Video Download",
      description: "Your animation video is downloading.",
    });
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    scrollToBottom();

    // Show scroll button when scrolled up
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
        const atBottom = scrollHeight - scrollTop - clientHeight < 100;
        setShowScrollButton(!atBottom);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [messages]);

  // Function to format markdown-like text
  const formatMarkdown = (text: string) => {
    // Replace markdown elements with styled spans
    return text
      .split("\n")
      .map((line, i) => {
        // Headers
        if (line.startsWith("# ")) {
          return <h1 key={i} className="text-2xl font-bold my-2">{line.substring(2)}</h1>;
        }
        if (line.startsWith("## ")) {
          return <h2 key={i} className="text-xl font-bold my-2">{line.substring(3)}</h2>;
        }
        if (line.startsWith("### ")) {
          return <h3 key={i} className="text-lg font-bold my-2">{line.substring(4)}</h3>;
        }

        // Lists
        if (line.match(/^\d+\.\s/)) {
          const content = line.replace(/^\d+\.\s/, '');
          return (
            <div key={i} className="flex my-1 pl-2">
              <span className="mr-2 font-medium">{line.match(/^\d+\./)?.[0]}</span>
              <span dangerouslySetInnerHTML={{ __html: formatInlineText(content) }} />
            </div>
          );
        }

        // Empty line
        if (!line.trim()) {
          return <div key={i} className="my-2"></div>;
        }

        // Regular text
        return (
          <div key={i} className="my-1">
            <span dangerouslySetInnerHTML={{ __html: formatInlineText(line) }} />
          </div>
        );
      });
  };

  // Helper for inline text formatting
  const formatInlineText = (text: string) => {
    // Bold text
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Italic text
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Math expressions (surrounded by \( \) or \[ \])
    text = text.replace(/\\[\(\[](.*?)\\[\)\]]/g, '<span class="text-orange-600 font-medium">$1</span>');
    
    return text;
  };

  // Function to render message content with formatting
  const renderMessageContent = (content: string, messageIndex: number) => {
    // Check if content contains sections
    const hasCaption = content.includes("{captionscript}");
    const hasManim = content.includes("{manim}");
    
    if (!hasCaption && !hasManim) {
      // Regular message content
      return (
        <div className="whitespace-pre-wrap">
          {formatMarkdown(content)}
        </div>
      );
    }
    
    // Split content into explanation, captionscript, and manim sections
    let explanation = content;
    let captionscript = "";
    let manim = "";
    
    if (hasCaption) {
      const captionParts = content.split("{captionscript}");
      explanation = captionParts[0];
      const endParts = captionParts[1].split("{/captionscript}");
      captionscript = endParts[0];
      
      if (endParts.length > 1) {
        explanation = explanation + endParts[1];
      }
    }
    
    if (hasManim) {
      const manimParts = explanation.split("{manim}");
      explanation = manimParts[0];
      const endParts = manimParts[1].split("{/manim}");
      manim = endParts[0];
      
      if (endParts.length > 1) {
        explanation = explanation + endParts[1];
      }
    }
    
    // Find if we have a video for this message
    const animationForMessage = Object.entries(videoResults).find(
      ([id, _]) => runningManimCode?.messageIndex === messageIndex && runningManimCode?.animationId === id
    );
    
    // Find any video that was generated for this message
    const videoForMessage = Object.entries(videoResults).find(([id, _]) => {
      // Extract the message index from our ID format: manim-{messageIndex}-{timestamp}-{random}
      return id.startsWith(`manim-${messageIndex}-`);
    });
    
    // Log for debugging
    console.log(`Message ${messageIndex} animation status:`, {
      hasManim,
      runningManimCode: runningManimCode ? { ...runningManimCode } : null,
      animationForMessage: animationForMessage ? { id: animationForMessage[0], status: animationForMessage[1].status } : null,
      videoForMessage: videoForMessage ? { id: videoForMessage[0], status: videoForMessage[1].status } : null,
      videoResults: { ...videoResults }
    });
    
    return (
      <div className="space-y-4">
        <div className="whitespace-pre-wrap">
          {formatMarkdown(explanation)}
        </div>
        
        {captionscript && (
          <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
            <div className="flex items-center mb-2 text-primary">
              <BookOpen className="w-4 h-4 mr-2" />
              <h3 className="font-medium">Video Script</h3>
            </div>
            <div className="whitespace-pre-wrap text-gray-700 text-sm">
              {captionscript.trim()}
            </div>
          </div>
        )}
        
        {manim && (
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-md p-4 bg-gray-50 font-mono">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center text-primary">
                  <FileCode className="w-4 h-4 mr-2" />
                  <h3 className="font-medium">MANIM Animation Code</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex items-center text-xs"
                    onClick={() => handleCopyCode(manim.trim())}
                  >
                    {copiedCode === manim.trim() ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 mr-1" /> Copy Code
                      </>
                    )}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="default" 
                    className="flex items-center text-xs"
                    onClick={() => handleRunManimCode(manim.trim(), messageIndex)}
                    disabled={!!runningManimCode}
                  >
                    <Play className="w-3 h-3 mr-1" /> Run Animation
                  </Button>
                </div>
              </div>
              <div className="relative">
                <pre className="whitespace-pre text-gray-700 text-xs overflow-x-auto max-h-60 overflow-y-auto">
                  {manim.trim()}
                </pre>
              </div>
            </div>
            
            {/* Animation result area */}
            {(animationForMessage || videoForMessage) && (
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <div className="bg-gray-50 py-2 px-4 font-medium flex items-center justify-between">
                  <div className="flex items-center">
                    <Video className="w-4 h-4 mr-2 text-primary" />
                    <span>Animation Result</span>
                  </div>
                  
                  {videoForMessage && videoForMessage[1].status === 'ready' && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex items-center text-xs"
                      onClick={() => handleDownloadVideo(videoForMessage[1].url)}
                    >
                      <Download className="w-3 h-3 mr-1" /> Download Video
                    </Button>
                  )}
                </div>
                
                <div className="p-4">
                  {animationForMessage && animationForMessage[1].status === 'processing' ? (
                    <div className="flex flex-col items-center justify-center py-6">
                      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                      <p className="text-gray-600 text-sm">Generating your animation...</p>
                      <p className="text-gray-500 text-xs mt-1">This may take a few moments</p>
                    </div>
                  ) : videoForMessage && videoForMessage[1].status === 'ready' ? (
                    <video 
                      className="w-full rounded-md shadow-sm" 
                      src={videoForMessage[1].url} 
                      poster={videoForMessage[1].thumbnail}
                      controls
                    />
                  ) : videoForMessage && videoForMessage[1].status === 'failed' ? (
                    <div className="flex flex-col items-center justify-center py-6 text-red-500">
                      <X className="w-8 h-8 mb-2" />
                      <p className="font-medium">Animation generation failed</p>
                      <p className="text-xs mt-1 text-gray-500">There was an error processing your Manim code</p>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="w-full py-4 border-b">
        <CardTitle className="text-xl flex items-center">
          <Video className="inline-block w-5 h-5 mr-2 text-primary" />
          Math Video Explanation Generator
        </CardTitle>
        <CardDescription>
          Enter a math problem to get a detailed video explanation
        </CardDescription>
      </div>

      {/* Messages container */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto py-4 space-y-4"
      >
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`
                max-w-[90%] md:max-w-[80%] rounded-lg p-4
                ${message.sender === "user" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-foreground"}
              `}>
                <div className="flex items-start mb-2">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage 
                      src={message.sender === "user" ? "/images/user-avatar.png" : "/images/bot-avatar.png"} 
                      alt={message.sender === "user" ? "User" : "Bot"} 
                    />
                    <AvatarFallback>{message.sender === "user" ? "U" : "B"}</AvatarFallback>
                  </Avatar>
                  <div className="text-xs opacity-70">
                    {message.sender === "user" ? "You" : "Math Video Bot"}
                  </div>
                </div>
                
                {renderMessageContent(message.content, index)}
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-start"
            >
              <div className="flex items-center space-x-2 bg-muted p-4 rounded-lg">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/images/bot-avatar.png" alt="Bot" />
                  <AvatarFallback>B</AvatarFallback>
                </Avatar>
                <div className="flex items-center">
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-200 mx-1"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-500"></div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} className="h-1" />
        </AnimatePresence>
      </div>

      {/* Scroll to bottom button */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToBottom}
            className="fixed bottom-28 right-8 p-2 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors z-10"
          >
            <ArrowDown size={18} />
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Example questions */}
      <div className="py-2 border-t">
        <p className="text-xs text-gray-500 flex items-center mb-2">
          <Lightbulb className="w-3 h-3 mr-1" />
          Try asking one of these:
        </p>
        <div className="flex flex-wrap gap-2">
          {exampleQuestions.map((question, idx) => (
            <button
              key={idx}
              onClick={() => setInputValue(question)}
              className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full hover:bg-primary/20 transition-colors flex items-center"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Input container */}
      <div className="py-4">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
          <div className="relative">
            <Input
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter a math problem or concept..."
              className="pr-10"
              disabled={isProcessing}
            />
            <Button 
              type="submit" 
              size="icon" 
              variant="ghost" 
              className="absolute right-0 top-0 h-full"
              disabled={isProcessing || inputValue.trim() === ""}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="relative">
            <Input
              type={showApiKey ? "text" : "password"}
              value={apiKey}
              onChange={handleApiKeyChange}
              placeholder="Enter your OpenAI API key..."
              className="pr-10"
              disabled={isProcessing}
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="absolute right-0 top-0 h-full"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs text-gray-500">
              <LockKeyhole className="w-3 h-3 mr-1" />
              <span>OpenAI API Key required (gpt-4o model used)</span>
            </div>
            
            <Button 
              type="submit" 
              disabled={isProcessing || inputValue.trim() === "" || apiKey.trim() === ""}
              className="flex items-center"
            >
              <Video className="mr-2 h-4 w-4" />
              Generate Video Explanation
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 