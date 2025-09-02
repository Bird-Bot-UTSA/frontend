// app/login/page.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/hooks/useTheme';
import { DEFAULT_USER_DATA } from '../../lib/constants';
import Logo from '../../components/ui/Logo';
import FormInput from '../../components/ui/FormInput';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import GradientBackground from '../../components/ui/GradientBackground';
import apiClient from '../../lib/api-client';

const LoginPage: React.FC = () => {
    const { updateUser } = useTheme();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            // Call the real login API
            const response = await apiClient.loginUser({
                user_email: formData.email,
                user_password: formData.password,
            });

            if (response.success) {
                // Store user data (including uid) in updateUser
                const user = {
                    name: formData.email.split('@')[0], // Use email prefix as name
                    email: formData.email,
                    uid: response.data.uid,
                    ...DEFAULT_USER_DATA
                };
                updateUser(user);
                window.location.href = '/chat';
            } else {
                setErrors({ general: response.error || 'Login failed. Please try again.' });
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrors({ general: 'Login failed. Please try again.' });
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 relative">
            <GradientBackground />
            
            <div className="z-10 w-full max-w-2xl">
                <div className="text-center mb-6">
                    <Logo size="large" className="mx-auto mb-4" priority={true} />
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-mono">
                        Welcome Back
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 font-mono">
                        Sign in to continue learning
                    </p>
                </div>

                <Card className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {errors.general && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                                <p className="text-red-600 dark:text-red-400 text-sm font-mono">
                                    {errors.general}
                                </p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                        <FormInput
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.email && (
                                    <p className="text-red-500 text-sm font-mono mt-1">{errors.email}</p>
                        )}
                            </div>
                            <div>
                        <FormInput
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.password && (
                                    <p className="text-red-500 text-sm font-mono mt-1">{errors.password}</p>
                        )}
                            </div>
                        </div>

                        <Button type="submit" className="w-full h-12">
                            Sign In
                        </Button>
                    </form>

                    <div className="mt-4 text-center">
                        <p className="text-gray-600 dark:text-gray-400 font-mono">
                            Don't have an account?{' '}
                            <Link 
                                href="/signup" 
                                className="text-blue-600 hover:text-blue-500 hover:underline font-mono"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </Card>

                <div className="mt-4 text-center">
                    <Link 
                        href="/" 
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:underline font-mono"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default LoginPage;