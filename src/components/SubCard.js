import React from 'react';

export default function SubCard({ ChannelTitle }) {
    return (
        <div className="flex items-center mb-4">
            <img
                className="w-8 h-8 rounded-full mr-4"
                src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1574&q=80"
                alt={ChannelTitle}
            />
            <p className="text-sm text-gray-500">채널 이름{ChannelTitle}</p>
        </div>
    );
}
