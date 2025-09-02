"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, User, Globe, Edit2, Check, X } from 'lucide-react';
import { useTheme } from '../../lib/hooks/useTheme';
import { LANGUAGES, DEFAULT_USER_DATA } from '../../lib/constants';
import Logo from '../../components/ui/Logo';
import FormSelect from '../../components/ui/FormSelect';
import Card from '../../components/ui/Card';
import GradientBackground from '../../components/ui/GradientBackground';

const ProfilePage: React.FC = () => {
    const { user, updateUser } = useTheme();
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

    // Theme functionality removed - using light mode only

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 relative">
            <GradientBackground />
            
            <div className="z-10 w-full max-w-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link 
                        href="/chat" 
                        className="flex items-center text-white/80 hover:text-white hover:underline font-mono"
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
                        <h1 className="text-2xl font-semibold text-white font-mono">
                            Profile Settings
                        </h1>
                    </div>

                    <div className="space-y-6">
                        {/* User Information */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-medium text-white font-mono flex items-center">
                                <User className="w-5 h-5 mr-2" />
                                Personal Information
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-white mb-2 font-mono">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        {isEditingName ? (
                                            <div className="flex">
                                                <input
                                                    type="text"
                                                    value={tempName}
                                                    onChange={(e) => setTempName(e.target.value)}
                                                    className="flex-1 px-4 py-3 border border-white/30 rounded-l-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm font-mono"
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
                                                <div className="flex-1 px-4 py-3 bg-white/10 rounded-l-lg text-white font-mono border border-white/30">
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
                                    <label className="block text-sm font-medium text-white mb-2 font-mono">
                                        Email
                                    </label>
                                    <p className="px-4 py-3 bg-white/10 rounded-lg text-white font-mono border border-white/30">
                                        {currentUser.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Language Settings */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-medium text-white font-mono flex items-center">
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


                    </div>
                </Card>
            </div>
        </main>
    );
};

export default ProfilePage; 