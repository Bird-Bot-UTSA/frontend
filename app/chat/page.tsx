// app/chat/page.tsx
"use client"; // This ensures that it's a client component in Next.js

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Send, User } from 'lucide-react';
import { useTheme } from '../../lib/hooks/useTheme';
import Logo from '../../components/ui/Logo';
import GradientBackground from '../../components/ui/GradientBackground';
import { apiClient } from '../../lib/api-client';


interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
}

const ChatPage: React.FC = () => {
    const { user } = useTheme();
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isChatActive, setIsChatActive] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (inputRef.current && isChatActive) {
            inputRef.current.focus();
        }
    }, [isChatActive]);

    const handleSendMessage = async () => {
        if (!inputValue.trim() || !user?.email) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputValue.trim(),
            isUser: true,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        const currentInput = inputValue.trim();
        setInputValue('');
        setIsTyping(true);

        try {
            // Call the real API
            const response = await apiClient.askMathQuestion(user.email, currentInput);

            if (response.success && response.data) {
                const aiMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    text: response.data.ai_response || 'I received your message but couldn&apos;t generate a response.',
                    isUser: false,
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, aiMessage]);
            } else {
                // Handle API error
                const errorMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    text: `Sorry, I encountered an error: ${response.error || 'Unknown error occurred'}. Please try again.`,
                    isUser: false,
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, errorMessage]);
            }
        } catch (error) {
            console.error('Error calling math API:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: 'Sorry, I encountered an error while processing your request. Please try again.',
                isUser: false,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleInputFocus = () => {
        if (!isChatActive) {
            setIsChatActive(true);
        }
    };

    if (!user) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center p-24 relative">
                <GradientBackground />
                <div className="z-10 text-center">
                    <p className="text-white/80">Please log in to access chat.</p>
                    <Link href="/login" className="text-blue-300 hover:text-blue-200 hover:underline mt-2 inline-block">
                        Go to Login
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen flex-col relative">
            <GradientBackground />
            
            {/* User Name - Top Right */}
            {user && (
                <div className="absolute top-8 right-32 z-30">
                    <Link href="/profile" className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-colors">
                        <User className="w-4 h-4 mr-2" />
                        {user.name}
                    </Link>
                </div>
            )}

            {/* Divider Line - Only when chat is active */}
            {isChatActive && (
                <div className="absolute top-24 left-0 right-0 z-20">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-8"></div>
                </div>
            )}

            {/* Logo - Animated */}
            <div className={`absolute left-1/2 transform -translate-x-1/2 z-20 transition-all duration-700 ${
                isChatActive 
                    ? 'top-12 -translate-y-1/2 scale-75' 
                    : 'top-1/2 -translate-y-1/2 scale-100'
            }`}>
                <div className="flex flex-col items-center">
                    <Logo size="large" />
                    {!isChatActive && (
                        <p className="text-xl text-white font-mono text-center mt-2">
                            Ask me any math question and I&apos;ll help you solve it!
                        </p>
                    )}
                </div>
            </div>

            {/* Chat Container */}
            <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-8 pt-32 pb-12 z-10">
                {/* Welcome Message */}
                {!isChatActive && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <div className="mb-8">
                            {/* Text moved to under logo */}
                        </div>
                    </div>
                )}

                {/* Messages */}
                {isChatActive && (
                    <div className="flex-1 overflow-y-auto mb-6 space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                                        message.isUser
                                            ? 'bg-blue-600 text-white shadow-lg'
                                            : 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
                                    }`}
                                >
                                    <p className="text-sm">{message.text}</p>
                                    <p className={`text-xs mt-2 ${
                                        message.isUser ? 'text-blue-100' : 'text-white/60'
                                    }`}>
                                        {message.timestamp.toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                        
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-2xl border border-white/20">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div ref={messagesEndRef} />
                    </div>
                )}

                {/* Input Area */}
                <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border-2 border-white/20 shadow-lg">
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        onFocus={handleInputFocus}
                        placeholder="Ask a math question..."
                        className="flex-1 px-4 py-3 bg-transparent text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent font-mono border-0"
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isTyping}
                        className="px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400/50 disabled:border-blue-400/50 text-white rounded-xl transition-colors duration-200 disabled:cursor-not-allowed border-2 border-blue-600 hover:border-blue-700"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </main>
    );
};

export default ChatPage;