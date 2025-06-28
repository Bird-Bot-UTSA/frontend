"use client";
// app/signup/page.tsx

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import GradientBackground from '../../components/ui/GradientBackground';

const SignUpPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle sign up logic here
        const userData = { name, email, language: 'English', theme: 'system' };
        localStorage.setItem('user', JSON.stringify(userData));
        console.log('Sign Up:', { name, email, password, confirmPassword });
        
        // Apply default theme
        const root = document.documentElement;
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        
        // Redirect to chat page after signup
        window.location.href = '/chat';
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 relative">
            <GradientBackground />
            
            <div className="z-10 w-full max-w-md">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <Image
                        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                        src="/MathAI.png"
                        alt="Math.AI Logo"
                        width={240}
                        height={49}
                        priority
                    />
                </div>

                {/* Signup Form */}
                <div className="bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-xl p-8 border border-gray-200 dark:border-neutral-800">
                    <h1 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-white font-mono">
                        Create Account
                    </h1>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-mono">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-700 rounded-lg bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-2xl font-mono"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-mono">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-700 rounded-lg bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-2xl font-mono"
                                required
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-mono">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-700 rounded-lg bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-2xl font-mono"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-mono">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-700 rounded-lg bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-2xl font-mono"
                                required
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 font-mono font-medium"
                        >
                            Create Account
                        </button>
                    </form>
                    
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                            Already have an account?{' '}
                            <Link 
                                href="/login" 
                                className="text-blue-500 hover:text-blue-600 hover:underline font-mono"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="mt-6 text-center">
                    <Link 
                        href="/" 
                        className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:underline font-mono"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default SignUpPage;
