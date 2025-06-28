"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, User, Globe, Palette, Save, Edit2, Check, X } from 'lucide-react';
import GradientBackground from '../../components/ui/GradientBackground';

const ProfilePage: React.FC = () => {
    const [user, setUser] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        language: 'English',
        theme: 'system'
    });

    const [isEditingName, setIsEditingName] = useState(false);
    const [tempName, setTempName] = useState('');

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'fr', name: 'Français' },
        { code: 'de', name: 'Deutsch' },
        { code: 'it', name: 'Italiano' },
        { code: 'pt', name: 'Português' },
        { code: 'ru', name: 'Русский' },
        { code: 'zh', name: '中文' },
        { code: 'ja', name: '日本語' },
        { code: 'ko', name: '한국어' }
    ];

    const themes = [
        { value: 'system', label: 'System', description: 'Follows your device settings' },
        { value: 'light', label: 'Light', description: 'Light theme' },
        { value: 'dark', label: 'Dark', description: 'Dark theme' }
    ];

    useEffect(() => {
        // Load user data from localStorage or API
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const userData = JSON.parse(savedUser);
            setUser(userData);
            setTempName(userData.name);
            
            // Apply the saved theme
            applyTheme(userData.theme || 'system');
        }
    }, []);

    const applyTheme = (theme: string) => {
        const root = document.documentElement;
        
        if (theme === 'dark') {
            root.classList.add('dark');
            console.log('Applied dark theme');
        } else if (theme === 'light') {
            root.classList.remove('dark');
            console.log('Applied light theme');
        } else {
            // System theme - check system preference
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                root.classList.add('dark');
                console.log('Applied system dark theme');
            } else {
                root.classList.remove('dark');
                console.log('Applied system light theme');
            }
        }
    };

    const handleNameEdit = () => {
        setIsEditingName(true);
        setTempName(user.name);
    };

    const handleNameSave = () => {
        if (tempName.trim()) {
            const updatedUser = { ...user, name: tempName.trim() };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
        }
        setIsEditingName(false);
    };

    const handleNameCancel = () => {
        setTempName(user.name);
        setIsEditingName(false);
    };

    const handleLanguageChange = (newLanguage: string) => {
        const updatedUser = { ...user, language: newLanguage };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    const handleThemeChange = (newTheme: string) => {
        console.log('Theme change requested:', newTheme);
        
        const updatedUser = { ...user, theme: newTheme };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Apply theme changes immediately
        applyTheme(newTheme);
    };

    // Apply theme on component mount
    useEffect(() => {
        if (user.theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else if (user.theme === 'light') {
            document.documentElement.classList.remove('dark');
        } else {
            // System theme - check system preference
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    }, [user.theme]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 relative">
            <GradientBackground />
            
            <div className="z-10 w-full max-w-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link 
                        href="/chat" 
                        className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:underline font-mono"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Chat
                    </Link>
                    
                    <div className="flex justify-center">
                        <Image
                            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                            src="/MathAI.png"
                            alt="Math.AI Logo"
                            width={200}
                            height={41}
                            priority
                        />
                    </div>
                    
                    <div className="w-20"></div> {/* Spacer for centering */}
                </div>

                {/* Profile Card */}
                <div className="bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-xl p-8 border border-gray-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white font-mono">
                            Profile Settings
                        </h1>
                    </div>

                    <div className="space-y-6">
                        {/* User Information */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-white font-mono flex items-center">
                                <User className="w-5 h-5 mr-2" />
                                Personal Information
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-mono">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        {isEditingName ? (
                                            <div className="flex">
                                                <input
                                                    type="text"
                                                    value={tempName}
                                                    onChange={(e) => setTempName(e.target.value)}
                                                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-neutral-700 rounded-l-lg bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-2xl font-mono"
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            handleNameSave();
                                                        } else if (e.key === 'Escape') {
                                                            handleNameCancel();
                                                        }
                                                    }}
                                                    autoFocus
                                                />
                                                <button
                                                    onClick={handleNameSave}
                                                    className="px-3 py-3 bg-green-500 hover:bg-green-600 text-white border border-green-500 hover:border-green-600 transition-colors duration-200"
                                                >
                                                    <Check className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={handleNameCancel}
                                                    className="px-3 py-3 bg-red-500 hover:bg-red-600 text-white border border-red-500 hover:border-red-600 rounded-r-lg transition-colors duration-200"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex">
                                                <div className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-l-lg text-gray-900 dark:text-white font-mono border border-gray-300 dark:border-neutral-700">
                                                    {user.name}
                                                </div>
                                                <button
                                                    onClick={handleNameEdit}
                                                    className="px-3 py-3 bg-blue-500 hover:bg-blue-600 text-white border border-blue-500 hover:border-blue-600 rounded-r-lg transition-colors duration-200"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-mono">
                                        Email
                                    </label>
                                    <p className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-900 dark:text-white font-mono border border-gray-300 dark:border-neutral-700">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Language Settings */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-white font-mono flex items-center">
                                <Globe className="w-5 h-5 mr-2" />
                                Language
                            </h2>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-mono">
                                    Preferred Language
                                </label>
                                <select
                                    value={user.language}
                                    onChange={(e) => handleLanguageChange(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-700 rounded-lg bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-2xl font-mono"
                                >
                                    {languages.map((lang) => (
                                        <option key={lang.code} value={lang.name}>
                                            {lang.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Theme Settings */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-white font-mono flex items-center">
                                <Palette className="w-5 h-5 mr-2" />
                                Appearance
                            </h2>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-mono">
                                    Color Scheme
                                </label>
                                <select
                                    value={user.theme}
                                    onChange={(e) => handleThemeChange(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-700 rounded-lg bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-2xl font-mono"
                                >
                                    {themes.map((theme) => (
                                        <option key={theme.value} value={theme.value}>
                                            {theme.label} - {theme.description}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage; 