// app/chat/page.tsx
"use client"; // This makes it a client component

import React, { useState } from 'react';

interface Message {
    id: string;
    content: string;
    role: 'user' | 'bot';
}

const ChatPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();

        if (!input) return; // Do not send empty messages

        const userMessage: Message = { id: crypto.randomUUID(), content: input, role: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInput('');

        // Simulate bot response
        const botResponse: Message = { id: crypto.randomUUID(), content: `Echo: ${input}`, role: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
    };

    return (
        <div className="flex flex-col h-screen p-4">
            <h1 className="text-3xl font-bold">Chat</h1>
            <div className="flex-grow overflow-auto mt-4 border rounded p-2">
                {messages.map((msg) => (
                    <div key={msg.id} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block rounded px-2 py-1 ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
              {msg.content}
            </span>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSend} className="flex mt-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 flex-grow"
                    placeholder="Type a message..."
                    required
                />
                <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatPage; // Ensure you are exporting the component