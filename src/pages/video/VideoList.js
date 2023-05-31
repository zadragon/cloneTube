import React, { useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import VideoCard from '../../components/VideoCard';
import { useCookies } from 'react-cookie';
import { useMutation } from 'react-query';
import { apiVideo } from '../../api/api';

const VideoList = () => {
    const [cookie] = useCookies();
    const { data, isLoading, error, mutate } = useMutation(payload => {
        return apiVideo.getVideoList(payload);
    });

    useEffect(() => {
        console.log('cookie', cookie.token);
        console.log('isLoading', isLoading);
        console.log('error', error);
        mutate(cookie.token);
    }, []);

    console.log('data', data?.VideoList);

    return (
        <div className="flex" style={{ display: 'none' }}>
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
