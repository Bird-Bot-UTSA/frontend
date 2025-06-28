// app/chat/page.tsx
"use client"; // This ensures that it's a client component in Next.js

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import GradientBackground from '../../components/ui/GradientBackground';

// Interface for message objects
interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
}

const ChatPage: React.FC = () => {
    // State to store messages and the input value
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isChatActive, setIsChatActive] = useState(false);
    const [user, setUser] = useState({ name: 'User', email: '' });
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // Load user data from localStorage
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const userData = JSON.parse(savedUser);
            setUser(userData);
            
            // Apply the saved theme
            const theme = userData.theme || 'system';
            const root = document.documentElement;
            
            if (theme === 'dark') {
                root.classList.add('dark');
            } else if (theme === 'light') {
                root.classList.remove('dark');
            } else {
                // System theme - check system preference
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    root.classList.add('dark');
                } else {
                    root.classList.remove('dark');
                }
            }
        }
    }, []);

    // Handle the user sending a message
    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Activate chat on first message
        if (!isChatActive) {
            setIsChatActive(true);
            setMessages([{
                id: '1',
                content: "Hello! I'm Math.AI, your intelligent math assistant. How can I help you today?",
                role: 'assistant',
                timestamp: new Date()
            }]);
        }

        const userMessage: Message = {
            id: crypto.randomUUID(),
            content: input.trim(),
            role: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const aiResponse: Message = {
                id: crypto.randomUUID(),
                content: generateAIResponse(input.trim()),
                role: 'assistant',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
    };

    // Function to generate the bot's response based on the user's message
    const generateAIResponse = (userInput: string): string => {
        const lowerInput = userInput.toLowerCase();
        
        if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
            return "Hello! I'm here to help you with math problems. What would you like to work on?";
        }
        
        if (lowerInput.includes('math') || lowerInput.includes('equation') || lowerInput.includes('solve')) {
            return "I'd be happy to help you with math problems! Please share the specific equation or problem you'd like me to solve.";
        }
        
        if (lowerInput.includes('thank')) {
            return "You're welcome! Is there anything else I can help you with?";
        }
        
        return "I understand you're asking about: '" + userInput + "'. I'm designed to help with mathematical concepts and problem-solving. Could you please provide a specific math question or equation?";
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="h-screen overflow-hidden relative">
            {/* Background gradients - positioned relative to viewport */}
            <div className={`transition-opacity duration-700 ease-in-out ${isChatActive ? 'opacity-0' : 'opacity-100'}`}>
                <GradientBackground />
            </div>
            
            {/* Chat content - positioned on top */}
            <div className="relative z-10 w-full max-w-6xl mx-auto h-full flex flex-col bg-transparent px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="flex items-center justify-between py-6 bg-transparent backdrop-blur-2xl mt-6">
                    <div className="flex-1"></div>
                    {isChatActive && (
                        <Link 
                            href="/profile" 
                            className="px-4 py-2 bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-neutral-800 text-gray-900 dark:text-white hover:bg-white/20 dark:hover:bg-black/20 transition-colors duration-200 font-mono text-sm"
                        >
                            {user.name}
                        </Link>
                    )}
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-h-0">
                    {/* Center Logo - slides up to header when chat is active */}
                    <div className={`flex items-center justify-center transition-all duration-700 ease-in-out ${
                        isChatActive ? 'flex-none transform -translate-y-16' : 'flex-1'
                    }`}>
                        <div className="text-center">
                            <Image
                                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert transition-all duration-700"
                                src="/MathAI.png"
                                alt="Math.AI Logo"
                                width={360}
                                height={74}
                                priority
                            />
                            <p className={`mt-4 text-gray-600 dark:text-gray-400 font-mono text-sm transition-opacity duration-700 ${
                                isChatActive ? 'opacity-0' : 'opacity-100'
                            }`}>
                                Start typing to begin your math journey...
                            </p>
                        </div>
                    </div>

                    {/* Chat Interface - appears when active */}
                    <div className={`transition-all duration-700 ease-in-out ${
                        isChatActive ? 'opacity-100 transform translate-y-0 flex-1 min-h-0 -mt-8' : 'opacity-0 transform translate-y-10 pointer-events-none flex-none h-0'
                    }`}>
                        {/* Messages Container - scrollable only this area */}
                        <div className="h-full overflow-y-auto py-0 space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex max-w-[85%] lg:max-w-[75%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3`}>
                                        {/* Avatar */}
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                            message.role === 'user' 
                                                ? 'bg-blue-500' 
                                                : 'bg-gradient-to-r from-blue-500 to-purple-600'
                                        }`}>
                                            {message.role === 'user' ? (
                                                <User className="w-4 h-4 text-white" />
                                            ) : (
                                                <Bot className="w-4 h-4 text-white" />
                                            )}
                                        </div>

                                        {/* Message Bubble */}
                                        <div className={`rounded-2xl px-5 py-4 backdrop-blur-2xl ${
                                            message.role === 'user'
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-transparent text-gray-900 dark:text-white border border-gray-300 dark:border-neutral-800'
                                        }`}>
                                            <p className="text-sm leading-relaxed whitespace-pre-wrap font-mono">{message.content}</p>
                                            <p className={`text-xs mt-3 font-mono ${
                                                message.role === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                                            }`}>
                                                {formatTime(message.timestamp)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                            <Bot className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="bg-transparent border border-gray-300 dark:border-neutral-800 rounded-2xl px-5 py-4 backdrop-blur-2xl">
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>
                    </div>
            </div>

                {/* Input Form - always visible */}
                <div className="border-t border-gray-300 dark:border-neutral-800 bg-transparent backdrop-blur-2xl py-6 mb-12">
                    <form onSubmit={handleSend} className="flex space-x-4">
                        <div className="flex-1 relative">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything about math..."
                                className="w-full px-5 py-4 border border-gray-300 dark:border-neutral-800 rounded-2xl bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none backdrop-blur-2xl font-mono"
                                disabled={isTyping}
                            />
                        </div>
                <button
                    type="submit"
                            disabled={!input.trim() || isTyping}
                            className="px-6 py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-2xl transition-colors duration-200 flex items-center justify-center backdrop-blur-2xl"
                >
                            <Send className="w-5 h-5" />
                </button>
            </form>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center font-mono">
                        Math.AI can help with equations, problem-solving, and mathematical concepts
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;