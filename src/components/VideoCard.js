import React from 'react';
import { Link } from 'react-router-dom';

export default function VideoCard({ videoInfo }) {
    const { Like, MovieId, Title, URL, UserId, View, ThumbNail, UserImage } = videoInfo;

    return (
        <Link to={`/video/detail/${MovieId}`}>
            <div className="mb-4 mr-5">
                <img className="w-80 h-44 rounded-xl" src={ThumbNail} alt={Title} />
                <div className="flex mt-2">
                    <img className="w-8 h-8 rounded-full mr-3" src={UserImage} />
                    <div>
                        <p className="font-semibold my-px">{Title}</p>
                        <p className="text-xs text-gray-500">
                            <strong> {UserId}</strong>
                        </p>
                        <p className="text-xs text-gray-500">
                            <span>조회수 {View}회</span>
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
