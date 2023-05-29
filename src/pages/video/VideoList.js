import React from 'react';
import VideoCard from '../../components/VideoCard';

const VideoList = () => {
    return (
        <div className="flex">
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
        </div>
    );
};

export default VideoList;
