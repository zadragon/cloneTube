import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div id="container">
            <div className="header">헤더부분</div>

            {/* 공통영역 밑에 들어가는 콘텐츠 */}
            <div id="content">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
