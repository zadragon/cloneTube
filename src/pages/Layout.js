import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="container">
            <div className="header">헤더부분</div>

            {/* 공통영역 밑에 들어가는 콘텐츠 */}
            <div id="content" className="w-full py-5">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
