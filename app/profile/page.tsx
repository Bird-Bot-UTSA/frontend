"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, User, Globe, Palette, Edit2, Check, X } from 'lucide-react';
import { useTheme } from '../../lib/hooks/useTheme';
import { LANGUAGES, THEMES, DEFAULT_USER_DATA } from '../../lib/constants';
import Logo from '../../components/ui/Logo';
import FormSelect from '../../components/ui/FormSelect';
import Card from '../../components/ui/Card';
import GradientBackground from '../../components/ui/GradientBackground';

const ProfilePage: React.FC = () => {
    const { user, updateTheme, updateUser } = useTheme();
    const [isEditingName, setIsEditingName] = useState(false);
    
    // Create a default user if none exists
    const currentUser = user || {
        name: 'Demo User',
        email: 'demo@example.com',
        ...DEFAULT_USER_DATA
    };
    
    const [tempName, setTempName] = useState(currentUser.name);

    const handleNameEdit = () => {
        setIsEditingName(true);
        setTempName(currentUser.name);
    };

    const handleNameSave = () => {
        if (tempName.trim()) {
            updateUser({ ...currentUser, name: tempName.trim() });
        }
        setIsEditingName(false);
    };

    const handleNameCancel = () => {
        setTempName(currentUser.name);
        setIsEditingName(false);
    };

    const handleLanguageChange = (newLanguage: string) => {
        updateUser({ ...currentUser, language: newLanguage });
    };

    const handleThemeChange = (newTheme: string) => {
        updateTheme(newTheme as 'light' | 'dark' | 'system');
    };

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
                        <Logo size="header" />
                    </div>
                    
                    <div className="w-20"></div> {/* Spacer for centering */}
                </div>

                {/* Profile Card */}
                <Card className="p-8">
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
                                                    {currentUser.name}
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
                                        {currentUser.email}
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
                            
                            <FormSelect
                                id="language"
                                label="Preferred Language"
                                value={currentUser.language}
                                onChange={(e) => handleLanguageChange(e.target.value)}
                                options={LANGUAGES.map(lang => ({ value: lang.name, label: lang.name }))}
                            />
                        </div>

                        {/* Theme Settings */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-white font-mono flex items-center">
                                <Palette className="w-5 h-5 mr-2" />
                                Appearance
                            </h2>
                            
                            <FormSelect
                                id="theme"
                                label="Color Scheme"
                                value={currentUser.theme}
                                onChange={(e) => handleThemeChange(e.target.value)}
                                options={THEMES.map(theme => ({ 
                                    value: theme.value, 
                                    label: theme.label, 
                                    description: theme.description 
                                }))}
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </main>
    );
};

export default ProfilePage; 