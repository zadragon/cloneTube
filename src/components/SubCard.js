import React from 'react';

export default function SubCard({ subInfo }) {
    const { Thumbnail, UserId } = subInfo;
    return (
        <div className="flex items-center mb-4">
            <img className="w-8 h-8 rounded-full mr-4" src={Thumbnail ? Thumbnail : '/img/user/molly.png'} />
            <p className="text-sm text-gray-500">{UserId}</p>
        </div>
    );
}
