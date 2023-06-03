import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useMutation, useQuery } from 'react-query';
import { apiSub } from '../api/api';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';

import SubCard from './SubCard';

export default function Sidebar() {
    const [cookie, setCookie, removeCookie] = useCookies(['token']);

    const {
        data,
        isLoading,
        error,
        mutate: getSubData,
    } = useMutation(payload => {
        return apiSub.getSubList(payload);
    });
    useEffect(() => {
        console.log('cookie', cookie.token);
        console.log('isLoading', isLoading);
        console.log('error', error);
        getSubData(cookie.token);
    }, []);

    console.log('sublistdata', data);

    return (
        <div className="w-1/6">
            {cookie.token ? (
                <>
                    <h1 className="mb-5 font-semibold text-xl">구독</h1>
                    {data?.data.SubList?.map((subInfo, idx) => {
                        return <SubCard key={idx} subInfo={subInfo} />;
                    })}
                </>
            ) : (
                <div className="border p-6 flex-col mr-2 rounded-xl">
                    <div className="flex items-center mt-5 mb-5 font-semibold text-xl">
                        로그인하면 동영상에 댓글을 달거나 구독할 수 있습니다 😃
                    </div>
                    <Link to="/member/login">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            login
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}
