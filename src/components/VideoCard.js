import React from 'react';
import { Link } from 'react-router-dom';

export default function VideoCard({ Title, ChannelTitle, View }) {
    return (
        <Link to="/video/detail/1">
            <div className="mb-4 mr-5">
                <img
                    className="w-80 h-44 rounded-xl"
                    src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1574&q=80"
                    alt={Title}
                />
                <div className="flex mt-2">
                    <img
                        className="w-8 h-8 rounded-full mr-3"
                        src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1574&q=80"
                        alt={ChannelTitle}
                    />
                    <div>
                        <p className="font-semibold my-px">제목 들어가는 곳 {Title}</p>
                        <p className="text-xs text-gray-500">채널 이름 들어가는 곳 {ChannelTitle}</p>
                        <p className="text-xs text-gray-500">조회수 들어가는 곳 {View}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
