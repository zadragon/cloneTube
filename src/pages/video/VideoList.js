import React from 'react';
import Sidebar from '../../components/Sidebar';
import VideoCard from '../../components/VideoCard';

const VideoList = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex">
                <VideoCard />
                <VideoCard />
                <VideoCard />
                <VideoCard />
            </div>
        </div>
    );
};

export default VideoList;
