"use client";
// app/signup/page.tsx

import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/hooks/useTheme';
import { DEFAULT_USER_DATA } from '../../lib/constants';
import { apiClient } from '../../lib/api-client';
import Logo from '../../components/ui/Logo';
import FormInput from '../../components/ui/FormInput';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import GradientBackground from '../../components/ui/GradientBackground';

const SignupPage: React.FC = () => {
    const { updateUser } = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: '',
        school: ''
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

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

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

        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
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
            // Call the signup API
            const signupData = {
                user_name: formData.name.trim(),
                user_email: formData.email,
                user_password: formData.password,
                user_age: formData.age ? parseInt(formData.age) : undefined,
                user_school: formData.school || undefined
            };

            const response = await apiClient.signupUser(signupData);
            
            if (response.success) {
                // Create user object for local state with the uid from API
                const user = {
                    name: formData.name.trim(),
                    email: formData.email,
                    age: formData.age || undefined,
                    school: formData.school || undefined,
                    uid: response.data.uid, // Store the uid from API response
                    ...DEFAULT_USER_DATA
                };
                
                updateUser(user);
                
                // Redirect to chat page
                window.location.href = '/chat';
            } else {
                setErrors({ general: response.error || 'Signup failed. Please try again.' });
            }
        } catch (error) {
            console.error('Signup error:', error);
            setErrors({ general: 'Signup failed. Please try again.' });
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 relative">
            <GradientBackground />
            
            <div className="z-10 w-full max-w-4xl">
                <div className="text-center mb-6">
                    <Logo size="large" className="mx-auto mb-4" priority={true} />
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-mono">
                        Create Account
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 font-mono">
                        Join us to start learning
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

                        {/* First Row: Name and Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                        <FormInput
                            id="name"
                            name="name"
                            label="Full Name"
                            type="text"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.name && (
                                    <p className="text-red-500 text-sm font-mono mt-1">{errors.name}</p>
                        )}
                            </div>
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
                        </div>

                        {/* Second Row: Password and Confirm Password */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                        <FormInput
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.password && (
                                    <p className="text-red-500 text-sm font-mono mt-1">{errors.password}</p>
                        )}
                            </div>
                            <div>
                        <FormInput
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.confirmPassword && (
                                    <p className="text-red-500 text-sm font-mono mt-1">{errors.confirmPassword}</p>
                        )}
                            </div>
                        </div>

                        {/* Third Row: Age and School */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                        <FormInput
                            id="age"
                            name="age"
                            label="Age (Optional)"
                                    type="text"
                            placeholder="Enter your age"
                            value={formData.age}
                            onChange={handleInputChange}
                        />
                        {errors.age && (
                                    <p className="text-red-500 text-sm font-mono mt-1">{errors.age}</p>
                        )}
                            </div>
                            <div>
                                <FormInput
                                    id="school"
                                    name="school"
                                    label="School (Optional)"
                                    type="text"
                                    placeholder="Enter your school name"
                                    value={formData.school}
                                    onChange={handleInputChange}
                                />
                                {errors.school && (
                                    <p className="text-red-500 text-sm font-mono mt-1">{errors.school}</p>
                                )}
                            </div>
                        </div>

                        {/* Fourth Row: Submit Button */}
                        <div className="flex justify-center pt-4">
                            <div className="w-full md:w-1/2">
                                <Button type="submit" className="w-full h-12">
                            Create Account
                        </Button>
                            </div>
                        </div>
                    </form>

                    <div className="mt-4 text-center">
                        <p className="text-gray-600 dark:text-gray-400 font-mono">
                            Already have an account?{' '}
                            <Link 
                                href="/login" 
                                className="text-blue-600 hover:text-blue-500 hover:underline font-mono"
                            >
                                Sign in
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

export default SignupPage;
