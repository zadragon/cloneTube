import React, { useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import VideoCard from '../../components/VideoCard';
// import { apiUser } from '../../api/api';
//import { useQuery } from 'react-query';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const VideoList = () => {
    const [cookie] = useCookies();

    useEffect(() => {
        console.log('cookie', cookie.token);
        //setCookies('token', cookie.token);
        //apiUser.getUserProfile(cookie.token);
        axios
            .post(`${process.env.REACT_APP_HOST}/api/videolist`, {
                authorization: cookie.token,
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });

        // fetch(`${process.env.REACT_APP_HOST}/api/sublist`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         authorization: cookie.token,
        //     }),
        // });
    }, []);

    //const { isLoading, error, data } = useQuery('getdata', apiUser.getUserProfile(cookie.token));

    // const { isLoading, error, data } = useQuery('getdata', () => {
    //     return axios.get(`${process.env.REACT_APP_HOST}/api/sublist`, {
    //         headers: {
    //             "Authorization": cookie.token,
    //         },
    //     });
    // });

    // console.log('isLoading', isLoading);
    // console.log('error', error);
    // console.log('data', data);

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
