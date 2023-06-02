import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useMutation, useQuery } from 'react-query';
import { apiSub } from '../api/api';

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

    console.log('data', data);

    return (
        <div className="mr-4 w-1/6">
            <h1 className="mb-5 font-semibold text-xl">구독</h1>
            {data?.data.SubList.map((idx, subInfo) => {
                return <SubCard key={idx} subInfo={subInfo} />;
            })}
        </div>
    );
}

{
    /* <h1 className="mb-5 font-semibold text-xl">
                로그인하면 <br />
                동영상에 댓글을 달거나
                <br /> 구독할 수 있습니다😃
            </h1> */
}
