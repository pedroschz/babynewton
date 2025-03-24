"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ArrowDown, Sparkles, Lightbulb, X, Check, Info, CornerDownLeft } from "lucide-react";

const botMessages = [
  "Hello! I'm your math assistant. How can I help you today?",
  "Of course! Derivatives are a fundamental concept in calculus that measure the rate of change of a function. Would you like me to explain the basic concept, or do you have a specific question about derivatives?",
  "The derivative of a function represents its rate of change at a particular point. For a function f(x), the derivative f'(x) tells you how quickly the output is changing with respect to the input at that point. In physical terms, if f(x) represents position, f'(x) represents velocity. For example, the derivative of f(x) = x² is f'(x) = 2x.",
];

const exampleQuestions = [
  "What is the derivative of sin(x)?",
  "Explain the chain rule",
  "Help me solve this integral: ∫x²dx",
  "What is a Taylor series?",
];

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { sender: "bot", content: botMessages[0], timestamp: new Date().toISOString() },
    { sender: "user", content: "Can you help me understand derivatives?", timestamp: new Date().toISOString() },
    { sender: "bot", content: botMessages[1], timestamp: new Date().toISOString() },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    // Add user message
    const newMessage = { 
      sender: "user", 
      content: inputValue, 
      timestamp: new Date().toISOString() 
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot typing
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev, 
        { 
          sender: "bot", 
          content: botMessages[2], 
          timestamp: new Date().toISOString() 
        }
      ]);
    }, 2000);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const atBottom = scrollHeight - scrollTop - clientHeight < 100;
    setShowScrollButton(!atBottom);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-primary/10 shadow-lg backdrop-blur-sm bg-white/95">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Math Assistant</CardTitle>
                    <CardDescription>
                      Ask me any math question and I'll help you understand it
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-xs bg-primary/10 px-2 py-1 rounded-full text-primary">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span>Online</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div 
                className="space-y-4 max-h-[400px] overflow-y-auto pr-2 pt-2 pb-4 scroll-smooth" 
                ref={scrollContainerRef}
                onScroll={handleScroll}
              >
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Avatar className={`${message.sender === 'bot' ? 'border-primary/20' : 'border-gray-200'} border`}>
                        <AvatarImage src={message.sender === "bot" ? "/bot-avatar.png" : "/user-avatar.png"} alt={message.sender === "bot" ? "Bot" : "User"} />
                        <AvatarFallback>{message.sender === "bot" ? "AI" : "U"}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center">
                          <p className="text-sm font-medium">
                            {message.sender === "bot" ? "Math Assistant" : "You"}
                          </p>
                          <span className="text-xs text-gray-400 ml-2">
                            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <motion.div 
                          className={`${
                            message.sender === "bot" 
                              ? "bg-muted border border-primary/10" 
                              : "bg-primary/10 border border-primary/5"
                          } p-4 rounded-xl shadow-sm`}
                          initial={{ scale: 0.95 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div 
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Avatar className="border border-primary/20">
                        <AvatarImage src="/bot-avatar.png" alt="Bot" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Math Assistant</p>
                        <div className="bg-muted p-4 rounded-xl border border-primary/10 shadow-sm">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce"></div>
                            <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                            <div className="w-2 h-2 rounded-full bg-primary/80 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>
              {showScrollButton && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={scrollToBottom}
                  className="absolute bottom-[120px] right-6 rounded-full p-2 bg-primary text-white shadow-lg hover:bg-primary/90 transition-colors"
                >
                  <ArrowDown className="h-4 w-4" />
                </motion.button>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-primary/10 shadow-lg backdrop-blur-sm bg-white/95">
            <CardContent className="pt-6">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="flex flex-wrap gap-2 mb-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Lightbulb className="h-4 w-4 mr-1 text-primary" />
                    <span>Try asking:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exampleQuestions.map((question, index) => (
                      <button
                        key={index}
                        type="button"
                        className="text-xs bg-gray-100 hover:bg-primary/10 text-gray-700 px-2 py-1 rounded-full transition-colors"
                        onClick={() => setInputValue(question)}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <Input
                    placeholder="Type your math question here..."
                    className="input-field pr-16 pl-5 py-6 text-base shadow-sm"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-1.5">
                    <Button 
                      type="submit" 
                      size="icon" 
                      className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 active:scale-95" 
                      disabled={inputValue.trim() === ""}
                    >
                      <motion.div whileTap={{ scale: 0.9 }}>
                        {inputValue.trim() === "" ? (
                          <CornerDownLeft className="h-4 w-4" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                      </motion.div>
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <div className="flex items-center">
                    <Info className="h-3 w-3 mr-1" />
                    <span>Responses are AI-generated and may not be perfect</span>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="text-primary hover:underline transition-colors flex items-center"
                      onClick={() => setMessages([])}
                    >
                      <X className="h-3 w-3 mr-1" /> Clear chat
                    </button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 