import React from 'react';
import SubCard from './SubCard';

export default function Sidebar() {
    return (
        <div className="mr-4 w-1/6">
            <h1 className="mb-5 font-semibold text-xl">구독</h1>
            <SubCard />
            <SubCard />
            <SubCard />
            <SubCard />

            {/* 로그인 안했을 경우 */}
            {/* <h1 className="mb-5 font-semibold text-xl">
                로그인하면 <br />
                동영상에 댓글을 달거나
                <br /> 구독할 수 있습니다😃
            </h1> */}
        </div>
    );
}
