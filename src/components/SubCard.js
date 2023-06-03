import React from 'react';

export default function SubCard({ subInfo }) {
    const { Thumbnail, channelId } = subInfo;
    return (
        <div className="flex items-center mb-4">
            <img className="w-8 h-8 rounded-full mr-4" src={Thumbnail} alt={Thumbnail} />
            <p className="text-sm text-gray-500">이름{channelId}</p>
        </div>
    );
}
